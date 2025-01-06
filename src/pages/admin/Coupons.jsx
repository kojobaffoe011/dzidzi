import { useCallback, useState } from "react";
import {
  useDeleteCoupon,
  useGetActiveUser,
  useGetCoupons,
} from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import AddCoupon from "../../components/modal/restaurant/AddCoupon";
import { convertDate, sortByColumn } from "../../utils/config";
import TableComponent from "../../components/reusableComponents/TableComponent";
import TableRow from "../../components/reusableComponents/TableRow";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import { HiUser } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import ErrorOccured from "../../components/notices/ErrorOccured";
import PropTypes from "prop-types";
import DeleteModal from "../../components/modal/restaurant/DeleteModal";
import TableLoader from "../../components/loaders/TableLoader";

const Coupons = ({ id }) => {
  const { pathname } = useLocation();
  const [openAddCoupon, setOpenAddCoupon] = useState(false);
  const [openDeleteCoupon, setOpenDeleteCoupon] = useState(false);
  const [couponId, setCouponID] = useState(null);

  const { mutationFn } = useDeleteCoupon(couponId && couponId);
  const {
    data: activeUser,
    isLoading: activeUserLoading,
    // isError: isActiveUserError,
    // error: activeUserError,
  } = useGetActiveUser();
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

  const handleOpenAddCouponModal = useCallback(() => {
    setOpenAddCoupon(true);
  }, []);
  const handleCloseAddCouponModal = useCallback(() => {
    setOpenAddCoupon(false);
  }, []);

  const handleOpenDeleteCouponModal = useCallback(() => {
    setOpenDeleteCoupon(true);
  }, []);
  const handleCloseDeleteCouponModal = useCallback(() => {
    setOpenDeleteCoupon(false);
  }, []);

  let user_id = null;

  if (activeUser.currentUserRole == "RESTAURANT_ADMIN") {
    user_id = activeUser.currentUserId;
  }

  const {
    data: coupons,
    isLoading: couponsLoading,
    isError: isCouponsError,
    refetch,
    // error: couponsError,
  } = useGetCoupons(id || user_id);

  const percentage = (percentage) => {
    if (percentage < 30) {
      return "bg-blue-100 text-blue-500";
    } else if (percentage < 50) {
      return "bg-yellow-100 text-yellow-500";
    } else {
      return "bg-green-100 text-green-500";
    }
  };

  if (couponsLoading || activeUserLoading) {
    return <TableLoader />;
  }

  if (isCouponsError) {
    return <ErrorOccured />;
  }
  return (
    <>
      <AddCoupon
        isOpen={openAddCoupon}
        handleCancel={handleCloseAddCouponModal}
        refetch={refetch}
        userRole={"RESTAURANT_ADMIN"}
        width="400px"
      />
      <DeleteModal
        isOpen={openDeleteCoupon}
        action={"coupon"}
        handleCancel={handleCloseDeleteCouponModal}
        mutationFn={mutationFn}
        refetch={refetch}
        width="400px"
      />
      <div className="flex flex-col mt-4">
        {pathname == "/dashboard/coupons" && (
          <div className="justify-end flex">
            {(activeUser?.currentUserRole.includes("RESTAURANT") ||
              activeUser?.currentUserRole == "ADMIN") && (
              <Button
                variant="primary"
                rounded
                className=" text-xs px-4 py-2"
                onClick={() => handleOpenAddCouponModal()}
              >
                Add Coupon
              </Button>
            )}
          </div>
        )}

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
          isLoading={couponsLoading}
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
                  {/* <Link to={`${item.id}`}> */}
                  <Button
                    variant="danger"
                    className="px-2 py-1 text-xs rounded-md"
                    onClick={async () => {
                      await setCouponID(item?.id);
                      handleOpenDeleteCouponModal();
                    }}
                  >
                    Delete Coupon
                  </Button>
                  {/* </Link> */}
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

Coupons.propTypes = {
  id: PropTypes.string,
  show: PropTypes.bool,
};
