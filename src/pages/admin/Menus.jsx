import { useCallback, useState } from "react";
import {
  useGetSingleMenu,
  useMenuListPaged,
} from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import AddCredentialModal from "../../components/modal/restaurant/AddCredentialModal";
import ViewRestaurant from "../../components/modal/restaurant/ViewRestaurant";
import TableAlt from "../../components/TableAlt";
import { useOutletContext } from "react-router";

const Menus = () => {
  const [, activeUser] = useOutletContext() 
  const [filters, setFilters] = useState({
  minimumPrice: null,
  maximumPrice: null,
  name: null,
  category: null,
  rating: null,
  visible: null,
  distance: null,
  latitude: null,
  longitude: null,
  restaurantID: activeUser?.currentUserRole == 'RESTAURANT_ADMIN' ? [activeUser?.currentUserId] : null,
  sortBy: null,
  orderBy: null,
  });
  const [menuID, setMenuID] = useState(null);

  const [credentialOpen, setCredentialsOpen] = useState(false);
  const handleOpenInvoiceModal = useCallback(() => {
    setCredentialsOpen(true);
  }, []);
  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);

  const [restaurantID, setRestaurantID] = useState(activeUser?.currentUserRole == 'RESTAURANT_ADMIN' ? activeUser?.currentUserId : null);
  const [viewOpen, setViewOpen] = useState(false);
  const handleOpenViewModal = useCallback(() => {
    setViewOpen(true);
  }, []);
  const handleCloseViewModal = useCallback(() => {
    setViewOpen(false);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: menuListAlt = [],
    isLoading: isMenuLoading,
    hasNextPage: menuHasNextPage,
    isFetchingNextPage: menuFetchingNextPage,
    isError: isMenuAltError,
  } = useMenuListPaged(
    filters.minimumPrice,
    filters.maximumPrice,
    filters.name,
    filters.category,
    filters.rating,
    filters.visible,
    filters.distance,
    filters.latitude,
    filters.longitude,
    filters.restaurantID,
    filters.sortBy,
    filters.orderBy,
    currentPage

  );

  let menuData = menuListAlt?.pages?.flatMap((page) => page?.data);
  const numberOfPages = menuData?.[0].totalPages


  const {
    isLoading: restaurantLoading,
    data: restaurantData,
    // isError,
    // error,
  } = useGetSingleMenu(menuID);

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
        restaurantData={restaurantData}
        restaurantLoading={restaurantLoading}
      />

      <div className="mt-2 flex-col gap-2">
        <p className="font-bold text-2xl">Menus</p>
      </div>
      <TableAlt
        isLoading={isMenuLoading}
        list={menuData}
        title={"No Record Found"}
        // handleNext = {handleNext}
        // handlePrevious = {handlePrevious}
          numberOfPages={numberOfPages}
           data={menuData}
            totalCount={30}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            isFetchingNextPage={menuFetchingNextPage}
            usersHasNextPage={menuHasNextPage}
      >

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
              menuData?.[0].results?.map((item, idx) => {
                return (
                  <tr key={idx} className={`${idx % 2 == 0 ? "bg-white" : "bg-gray-50"} `}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <p className="mr-3 italic">Name: </p>
                          <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                            {item?.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Price: </p>
                          <p className="mr-3 font-extrabold text-xs">
                            $ {item?.price}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Category: </p>
                          <p className="mr-3 font-extrabold text-xs text-red-600">
                            {item?.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <p className="mr-3 italic">Name: </p>
                          <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                            {item?.restaurant?.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Contact: </p>
                          <p className="mr-3 font-extrabold text-xs">
                            {item?.restaurant?.contact}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Rating: </p>
                          <p className="mr-3 font-extrabold text-xs text-red-600">
                            {item?.restaurant?.averageRating === 0
                              ? 0
                              : item?.restaurant?.averageRating || 4.9}
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
                          setMenuID(item?.id);
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
