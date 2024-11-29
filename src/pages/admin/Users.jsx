import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  useRestaurantList,
  useUserList,
  useUserListPaged,
} from "../../components/brokers/apicalls";
import Button from "../../components/Button";
import AddCredentialModal from "../../components/modal/restaurant/AddCredentialModal";
import ViewRestaurant from "../../components/modal/restaurant/ViewRestaurant";
import Table from "../../components/Table";
import TableAlt from "../../components/TableAlt";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilters] = useState({
  firstName:null,
  lastName:null,
  enabled:null,
  email:null,
  username:null,
  userId:null,
  sortBy:null,
  orderBy:null,
  })

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
  } = useUserListPaged(
  filter.firstName, 
  filter.lastName, 
  filter.enabled,
  filter.email,
  filter.username,
  filter.userId,
  filter.sortBy,
  filter.orderBy,
  currentPage
);


  let userData = usersList?.pages?.flatMap((page) => page?.data);
  const numberOfPages = userData?.[0].totalPages



  return (
    <>
      <AddCredentialModal
        isOpen={credentialOpen}
        handleCancel={handleCloseInvoiceModal}
        userRole={"RESTAURANT_ADMIN"}
        width="400px"
      />

      <ViewRestaurant
        isOpen={viewOpen}
        handleCancel={handleCloseViewModal}
        userRole={"RESTAURANT_ADMIN"}
        width="950px"
        restaurantID={restaurantID}
      />

      <div className="mt-2 flex-col gap-2">
        <p className="font-bold text-2xl">Users</p>
      </div>
      <TableAlt
      isLoading={usersLoading}
        list={userData}
        title={"No Record Found"}
          numberOfPages={numberOfPages}
            totalCount={4}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            isFetchingNextPage={usersFetchingNextPage}
            usersHasNextPage={usersHasNextPage}
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
            { userData?.[0].results?.map((item, idx) => {
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
                          {item?.firstName} {item?.lastName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 italic"> Contact: </p>
                        <p className="mr-3 font-extrabold text-xs">
                          {item?.contact}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 italic"> Email: </p>
                        <p className="mr-3 font-extrabold text-xs text-red-600">
                          {item?.credential?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <p className="mr-3 italic">Street: </p>
                        <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                          {item?.address?.street}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 italic"> House Number: </p>
                        <p className="mr-3 font-extrabold text-xs">
                          {item?.address?.houseNumber}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 italic"> City: </p>
                        <p className="mr-3 font-extrabold text-xs text-red-600">
                          {item?.address?.city}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <Link to={`${item?.id}`}>
                      <Button
                        variant="dark"
                        className="px-2 py-1 text-xs rounded-md"
                        // onClick={() => {
                        //   handleOpenViewModal();
                        //   setRestaurantID(item?.id);
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
      </TableAlt>
    </>
  );
};

export default Users;
