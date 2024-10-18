import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  useRestaurantList,
  useUserList,
} from "../../components/brokers/apicalls";
import Button from "../../components/Button";
import AddCredentialModal from "../../components/modal/restaurant/AddCredentialModal";
import ViewRestaurant from "../../components/modal/restaurant/ViewRestaurant";
import Table from "../../components/Table";

const Users = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  const [credentialOpen, setCredentialsOpen] = useState(false);

  const handleOpenInvoiceModal = useCallback(() => {
    setCredentialsOpen(true);
  }, []);
  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);

  const [restaurantID, setRestaurantID] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const handleOpenViewModal = useCallback(() => {
    setViewOpen(true);
  }, []);
  const handleCloseViewModal = useCallback(() => {
    setViewOpen(false);
  }, []);

  const {
    data: usersList = [],
    isLoading: usersLoading,
    hasNextPage: usersHasNextPage,
    fetchNextPage: usersFetchNextPage,
    isFetchingNextPage: usersFetchingNextPage,
    isError: isUsersError,
  } = useUserList(firstName, lastName);



  return (
    <>
      <AddCredentialModal
        isOpen={credentialOpen}
        handleCancel={handleCloseInvoiceModal}
        userRole={"RESTAURANT"}
        width="400px"
      />

      <ViewRestaurant
        isOpen={viewOpen}
        handleCancel={handleCloseViewModal}
        userRole={"RESTAURANT"}
        width="950px"
        restaurantID={restaurantID}
      />

      <div className="mt-2 flex-col gap-2">
        <p className="font-bold text-2xl">Users</p>
      </div>
      <Table
        totalCount={usersList?.pages?.[0].results?.length}
        usersHasNextPage={usersHasNextPage}
        isFetchingNextPage={usersFetchingNextPage}
        data={usersList?.pages?.[0].results}
        isLoading={usersLoading}
      >
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Restaurant Details
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Address
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {usersList?.pages?.[0].results?.map((item, idx) => {
              return (
                <tr
                  className={`${idx % 2 == 0 ? "bg-white" : "bg-gray-50"} `}
                  key={idx}
                >
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <p className="mr-3 italic">Name: </p>
                        <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                          {item?.value?.firstName} {item?.value?.lastName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 italic"> Contact: </p>
                        <p className="mr-3 font-extrabold text-xs">
                          {item?.value?.contact}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 italic"> Email: </p>
                        <p className="mr-3 font-extrabold text-xs text-red-600">
                          {item?.value?.credential?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <p className="mr-3 italic">Street: </p>
                        <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                          {item?.value?.address?.street}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 italic"> House Number: </p>
                        <p className="mr-3 font-extrabold text-xs">
                          {item?.value?.address?.houseNumber}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 italic"> City: </p>
                        <p className="mr-3 font-extrabold text-xs text-red-600">
                          {item?.value?.address?.city}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <Link to={`users/${item?.value?.id}`}>
                      <Button
                        variant="dark"
                        className="px-2 py-1 text-xs rounded-md"
                        // onClick={() => {
                        //   handleOpenViewModal();
                        //   setRestaurantID(item?.value?.id);
                        // }}
                      >
                        View Details
                      </Button>
                    </Link>
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

export default Users;
