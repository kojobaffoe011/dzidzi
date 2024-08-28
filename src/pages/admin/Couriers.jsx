import React, { useCallback, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  useGetCouriers,
  useRestaurantList,
  useUserList,
} from "../../components/brokers/apicalls";
import Button from "../../components/Button";
import AddCredentialModal from "../../components/modal/restaurant/AddCredentialModal";
import ViewRestaurant from "../../components/modal/restaurant/ViewRestaurant";
import Table from "../../components/Table";
import { convertDate } from "../../utils/config";

const Couriers = (props) => {
  const [credentialOpen, setCredentialsOpen] = useState(false);
  const { pathname } = useLocation();

  const handleOpenInvoiceModal = useCallback(() => {
    setCredentialsOpen(true);
  }, []);
  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);

  const [ID, setID] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const handleOpenViewModal = useCallback(() => {
    setViewOpen(true);
  }, []);
  const handleCloseViewModal = useCallback(() => {
    setViewOpen(false);
  }, []);

  const {
    data: couriers,
    isLoading: couriersLoading,
    isError: couriersError,
    error: iscouriersError,
  } = useGetCouriers();

  const fetchedData = props?.fetchedData || couriers;
  console.log(ID);

  return (
    <>
      <AddCredentialModal
        isOpen={credentialOpen}
        handleCancel={handleCloseInvoiceModal}
        userRole={"COURIER"}
        width="400px"
      />

      <ViewRestaurant
        isOpen={viewOpen}
        handleCancel={handleCloseViewModal}
        userRole={"RESTAURANT"}
        width="950px"
        restaurantID={ID}
      />

      <div className="mt-2 flex-col gap-2">
        <p className="font-bold text-2xl">{props.pagetitle}</p>
        {pathname == "/dashboard/couriers" && (
          <div className="flex justify-end">
            <Button
              variant="primary"
              className="px-2 py-2 text-sm"
              rounded
              onClick={() => {
                handleOpenInvoiceModal();
              }}
            >
              Add Courier
            </Button>
          </div>
        )}
      </div>
      <Table
        totalCount={fetchedData?.length}
        // usersHasNextPage={usersHasNextPage}
        // isFetchingNextPage={usersFetchingNextPage}
        data={fetchedData}
        isLoading={props?.loading || couriersLoading}
      >
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                {props.title || "Courier Details"}
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                {props?.type == "coupon" ? "Validity:" : "Address:"}
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {fetchedData?.map((item, idx) => {
              return (
                <tr
                  className={`${idx % 2 == 0 ? "bg-white" : "bg-gray-50"} `}
                  key={idx}
                >
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <p className="mr-3 italic">Name: </p>
                        {props?.type == "coupon" ? (
                          <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                            {item?.couponName}
                          </span>
                        ) : (
                          <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                            {item?.firstName} {item?.lastName}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 italic">
                          {props?.type == "coupon"
                            ? "Coupon Number:"
                            : "Contact:"}{" "}
                        </p>
                        <p className="mr-3 font-extrabold text-xs">
                          {props?.type == "coupon"
                            ? item?.couponNumber
                            : item?.contact}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 italic">
                          {" "}
                          {props?.type == "coupon" ? "Percentage" : "Email"}
                        </p>
                        <p className="mr-3 font-extrabold text-xs text-red-600">
                          {props?.type == "coupon"
                            ? item?.percentage
                            : item?.credential?.email}{" "}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <p className="mr-3 italic">
                          {props?.type == "coupon" ? "Start Date:" : "Street:"}
                        </p>
                        <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                          {props?.type == "coupon"
                            ? convertDate(item?.startDate)
                            : item?.address?.street}{" "}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 italic">
                          {" "}
                          {props?.type == "coupon"
                            ? "End Date:"
                            : "House Number:"}
                        </p>
                        <p className="mr-3 font-extrabold text-xs">
                          {props?.type == "coupon"
                            ? convertDate(item?.endDate)
                            : item?.address?.houseNumber}
                        </p>
                      </div>
                      {props?.type !== "coupon" && (
                        <div className="flex items-center">
                          <p className="mr-3 italic"> City: </p>
                          <p className="mr-3 font-extrabold text-xs text-red-600">
                            {item?.address?.city}
                          </p>
                        </div>
                      )}{" "}
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {props?.type !== "coupon" ? (
                      <Link
                        to={
                          props?.link
                            ? `/dashboard/${props.link}/${item?.id}`
                            : item?.id
                        }
                      >
                        <Button
                          variant="dark"
                          className="px-2 py-1 text-xs rounded-md"
                          onClick={() => {
                            setID(item?.id);
                          }}
                        >
                          View Details
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="dark"
                        className="px-2 py-1 text-xs rounded-md"
                        onClick={() => {
                          handleOpenViewModal(item?.id);
                          setID(item?.id);
                        }}
                      >
                        View Details
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Table>
    </>
  );
};

export default Couriers;
