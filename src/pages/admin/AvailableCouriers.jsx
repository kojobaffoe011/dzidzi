import { useCallback, useState } from "react";
import {
  useGetActiveUser,
  useGetCouriersOnline,
} from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import AddCoupon from "../../components/modal/restaurant/AddCoupon";
import { sortByColumn } from "../../utils/config";
import TableComponent from "../../components/reusableComponents/TableComponent";
import TableRow from "../../components/reusableComponents/TableRow";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import { HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import ErrorOccured from "../../components/notices/ErrorOccured";
import PropTypes from "prop-types";
import TableLoader from "../../components/loaders/TableLoader";
import { LuDot } from "react-icons/lu";
import { renderRating } from "./Restaurants";

const AvailableCouriers = () => {
  const { pathname } = useLocation();
  const [openAddCoupon, setOpenAddCoupon] = useState(false);

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
    { title: "Name", sortable: true, sortKey: "FIRSTNAME" },
    { title: "Phone", sortable: false },
    { title: "Rating", sortable: false },
    { title: "Email", sortable: false },
    { title: "Address", sortable: false },
  ];

  const handleOpenAddCouponModal = useCallback(() => {
    setOpenAddCoupon(true);
  }, []);
  const handleCloseAddCouponModal = useCallback(() => {
    setOpenAddCoupon(false);
  }, []);

  const {
    data: couriers,
    isLoading: couriersLoading,
    isError: isCourierError,
    refetch,
    // error: couponsError,
  } = useGetCouriersOnline();

  const percentage = (percentage) => {
    if (percentage < 30) {
      return "bg-blue-100 text-blue-500";
    } else if (percentage < 50) {
      return "bg-yellow-100 text-yellow-500";
    } else {
      return "bg-green-100 text-green-500";
    }
  };

  if (couriersLoading || activeUserLoading) {
    return <TableLoader />;
  }

  if (isCourierError) {
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

      <div className="flex flex-col mt-4">
        {pathname == "/dashboard/coupons" && (
          <div className="justify-end flex">
            <Button
              variant="primary"
              rounded
              className=" text-xs px-4 py-2"
              onClick={() => handleOpenAddCouponModal()}
            >
              Add Coupon
            </Button>
          </div>
        )}

        <div className="my-1"> </div>
        <TableComponent
          tablehead={tablehead}
          tabledata={couriers}
          filters={filters}
          setFilters={setFilters}
          sortByColumn={sortByColumn}
        >
          {couriers?.map((item, idx) => {
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
                      <p className="mr-3 font-bold">
                        {item?.firstName} {item?.lastName}
                      </p>

                      <div className="flex items-center">
                        <p className="text-xs font-light">
                          @{item?.credential.username}
                        </p>
                        <LuDot />
                        {item?.status == "ONLINE" ? (
                          <p className=" text-xs font-light text-green-600">
                            online
                          </p>
                        ) : (
                          <p className=" text-xs font-light text-red-600">
                            offline
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="mr-3 ">{item?.contact}</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  {renderRating(item.averageRating)}
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="mr-3 ">{item?.credential.email}</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="mr-3 ">
                        {item?.address?.street} {item?.address?.houseNumber},{" "}
                        {item?.address?.city}
                      </p>
                    </div>
                  </div>
                </TableColumnContent>
              </TableRow>
            );
          })}
        </TableComponent>
      </div>
    </>
  );
};

export default AvailableCouriers;

AvailableCouriers.propTypes = {
  id: PropTypes.string,
  show: PropTypes.bool,
};
