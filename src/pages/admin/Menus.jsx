import React, { useCallback, useEffect, useState } from "react";
import {
  useGetSingleMenu,
  useMenuList,
  useMenuListAlt,
} from "../../components/brokers/apicalls";
import Button from "../../components/Button";
import Spinner from "../../components/loaders/Spinner";
import AddCredentialModal from "../../components/modal/restaurant/AddCredentialModal";
import ViewRestaurant from "../../components/modal/restaurant/ViewRestaurant";
import Table from "../../components/Table";
import TableAlt from "../../components/TableAlt";

const Menus = () => {
  const [cursorHistory, setCursorHistory] = useState({
    firstCursor: null,
    lastCursor: null,
    direction: "FORWARD",
  });
  const [cursor, setCursor] = useState(null);
  const [filters, setFilters] = useState({
    name: null,
    category: null,
    rating: null,
    minPrice: null,
    maxPrice: null,
  });
  const [menuID, setMenuID] = useState(null);

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
    data: menuListAlt,
    isLoading: isMenuLoading,
    isError: isMenuAltError,
    error: menuError,
  } = useMenuListAlt(
    filters.name,
    filters.category,
    filters.rating,
    filters.minPrice,
    filters.maxPrice,
    restaurantID,
    cursorHistory.direction == "FORWARD"
      ? cursorHistory.lastCursor
      : cursorHistory.firstCursor, // Pass the current cursor
    cursorHistory.direction // Pass the current direction
  );

  const {
    isLoading: restaurantLoading,
    data: restaurantData,
    isError,
    error,
  } = useGetSingleMenu(menuID);

  const handlePrevious = () => {
    setCursorHistory({
      firstCursor: menuListAlt?.firstCursor,
      lastCursor: menuListAlt?.lastCursor,
      direction: "BACKWARDS",
    });
  };

  const handleNext = () => {
    setCursorHistory({
      firstCursor: menuListAlt?.firstCursor,
      lastCursor: menuListAlt?.lastCursor,
      direction: "FORWARD",
    });
  };

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
        restaurantData={restaurantData}
        restaurantLoading={restaurantLoading}
      />

      <div className="mt-2 flex-col gap-2">
        <p className="font-bold text-2xl">Menus</p>
      </div>
      <TableAlt
        totalCount={menuListAlt?.totalCount}
        isLoading={isMenuLoading}
        data={menuListAlt?.results}
        hasNextPage={menuListAlt?.hasNextPage}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        // fetchNextPage={menuFetchNextPage}
        // fetchPreviousPage={menuFetchPreviousPage}
        // isFetchingNextPage={menuFetchingNextPage}
        // isFetchingPreviousPage={menuFetchingPreviousPage}
        hasPreviousPage={menuListAlt?.hasPreviousPage}
        title={"No Record Found"}
      >
        {/* <TableAlt
        totalCount={0}
        isLoading={menuLoading}
        data={menuList?.pages?.flatMap((page) => page.menus) ?? []}
        hasNextPage={menuHasNextPage}
        fetchNextPage={menuFetchNextPage}
        fetchPreviousPage={menuFetchPreviousPage}
        isFetchingNextPage={menuFetchingNextPage}
        isFetchingPreviousPage={menuFetchingPreviousPage}
        hasPreviousPage={menuHasPreviousPage}
        handlePageChange={handlePageChange}
        cursor={cursor}
      > */}

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isMenuLoading ? (
              <tr>
                <td colSpan="3" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : isMenuAltError ? (
              <tr>
                <td colSpan="3" className="p-4 text-center">
                  Error loading menus
                </td>
              </tr>
            ) : (
              menuListAlt?.results?.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <p className="mr-3 italic">Name: </p>
                          <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                            {item?.value?.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Price: </p>
                          <p className="mr-3 font-extrabold text-xs">
                            $ {item?.value?.price}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Category: </p>
                          <p className="mr-3 font-extrabold text-xs text-red-600">
                            {item?.value?.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <p className="mr-3 italic">Name: </p>
                          <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                            {item?.value?.restaurant?.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Contact: </p>
                          <p className="mr-3 font-extrabold text-xs">
                            {item?.value?.restaurant?.contact}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Rating: </p>
                          <p className="mr-3 font-extrabold text-xs text-red-600">
                            {item?.value?.restaurant?.averageRating === 0
                              ? 0
                              : item?.value?.restaurant?.averageRating || 4.9}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <Button
                        variant="dark"
                        className="px-2 py-1 text-xs rounded-md"
                        onClick={() => {
                          handleOpenViewModal();
                          console.log(item);
                          setMenuID(item?.value?.id);
                        }}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </TableAlt>
    </>
  );
};

export default Menus;
