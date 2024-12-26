import { useCallback, useState } from "react";
import { useGetCoupons } from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import AddCoupon from "../../components/modal/restaurant/AddCoupon";
import { useOutletContext } from "react-router";
import {
  activeFilters,
  convertDate,
  handleFilterChange,
  sortByColumn,
} from "../../utils/config";
import TableComponent from "../../components/reusableComponents/TableComponent";
import TableRow from "../../components/reusableComponents/TableRow";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import FilterComponent from "../../components/reusableComponents/FilterComponent";
import FilterType from "../../components/reusableComponents/FilterType";
import RenderActiveFilters from "../../components/reusableComponents/RenderActiveFilters";

const Coupons = () => {
  const [credentialOpen, setCredentialsOpen] = useState(false);
  const [, activeUser] = useOutletContext();
  const [filters, setFilters] = useState([
    { name: "NAME", value: null, enabled: false },
    { name: "LASTNAME", value: null, enabled: false },
    { name: "EMAIL", value: null, enabled: false },
    { name: "USERNAME", value: null, enabled: false },
    { name: "AVG RATING", value: null, enabled: false },
    { name: "STATUS", value: null, enabled: false },
    { name: "COURIER ID", value: null, enabled: false },
    { name: "sortBy", value: null, enabled: false },
    { name: "orderBy", value: null, enabled: false },
  ]);

  const tablehead = [
    { title: "COUPON DETAILS", sortable: true, sortKey: "COUPON_NAME" },
    { title: "PERCENTAGE", sortable: false },
    { title: "START DATE", sortable: false },
    { title: "END DATE", sortable: false },
    { title: "Action", sortable: false },
  ];

  const handleOpenInvoiceModal = useCallback(() => {
    setCredentialsOpen(true);
  }, []);
  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);

  const {
    data: coupons,
    isLoading: couponsLoading,
    isError: couponsError,
    error: isCouponsError,
  } = useGetCoupons(activeUser);

  const percentage = (percentage) => {
    if (percentage < 30) {
      return "bg-blue-100 text-blue-500";
    } else if (percentage < 50) {
      return "bg-yellow-100 text-yellow-500";
    } else {
      return "bg-green-100 text-green-500";
    }
  };

  return (
    <>
      <AddCoupon
        isOpen={credentialOpen}
        handleCancel={handleCloseInvoiceModal}
        userRole={"RESTAURANT_ADMIN"}
        width="400px"
      />
      <div className="flex flex-col mt-4">
        <div className="justify-end flex">
          <Button
            variant="primary"
            rounded
            className=" text-xs px-4 py-2"
            onClick={() => handleOpenInvoiceModal()}
          >
            Add Coupon
          </Button>
        </div>

        {/* <FilterComponent
          filters={filters}
          setFilters={setFilters}
          activeFilters={activeFilters(filters)}
        >
          <FilterType
            filterType={"INPUTFIELD"}
            handleFilterChange={(event) =>
              handleFilterChange(event, "NAME", filters, setFilters)
            }
            placeholder={"Name"}
          />
          <FilterType
            filterType={"INPUTFIELD"}
            handleFilterChange={(event) =>
              handleFilterChange(event, "EMAIL", filters, setFilters)
            }
            placeholder={"Email"}
          />
          <FilterType
            filterType={"INPUTFIELD"}
            handleFilterChange={(event) =>
              handleFilterChange(event, "USERNAME", filters, setFilters)
            }
            placeholder={"Username"}
          />
        </FilterComponent>

        <RenderActi veFilters filters={filters} setFilters={setFilters} /> */}
        <div className="my-1"> </div>
        <TableComponent
          tablehead={tablehead}
          tabledata={coupons}
          filters={filters}
          setFilters={setFilters}
          sortByColumn={sortByColumn}
        >
          {coupons?.map((item, idx) => {
            return (
              <TableRow key={idx} index={idx}>
                <TableColumnContent>
                  <div className="flex gap-2">
                    <div className="rounded-full px-2 py-2 border bg-gray-100 uppercase font-extrabold text-xl">
                      <HiUser
                        className="text-slate-400 cursor-pointer"
                        size={"20px"}
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <p className="font-bold">{item.couponName}</p>
                      <p className="text-xs font-light">{item.couponNumber}</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex">
                    <div
                      className={`font-bold rounded-full text-sm px-4 py-1 ${percentage(
                        item.percentage
                      )}`}
                    >
                      <p className=" uppercase">{item.percentage}%</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="">{convertDate(item.startDate)}</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="">{convertDate(item.endDate)}</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <Link to={`${item.id}`}>
                    <Button
                      variant="dark"
                      className="px-2 py-1 text-xs rounded-md"
                    >
                      View Details
                    </Button>
                  </Link>
                </TableColumnContent>
              </TableRow>
            );
          })}
        </TableComponent>
      </div>
    </>
  );
};

export default Coupons;
