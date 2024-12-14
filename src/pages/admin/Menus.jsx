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
import PaginatedTable from "../../components/PaginatedTable";
import TableComponent from "../../components/reusableComponents/TableComponent";
import TableRow from "../../components/reusableComponents/TableRow";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";

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

  const tablehead = [
    {title: 'Name'},
    {title: 'Address'},
    // {title: 'Status'},
    // {title: 'Address'},
    {title: 'Action'},
  ]

  const tabledata = menuData?.[0].results


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

      <PaginatedTable 
      title={'No Orders Found'}
       list={menuData} 
       totalCount={6} 
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}
       isLoading={isMenuLoading}
       numberOfPages={numberOfPages}
       isFetchingNextPage={menuFetchingNextPage}
       dataHasNextPage={menuHasNextPage}
      >
          <TableComponent tabledata={tabledata} tablehead={tablehead}>
              {tabledata?.map((item,idx)=>{
                return <TableRow key={idx} index={idx}>
                    <TableColumnContent >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <p className="mr-3 italic">Name: </p>
                          <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Price: </p>
                          <p className="mr-3 font-extrabold text-xs">
                            $ {item.price}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Category: </p>
                          <p className="mr-3 font-extrabold text-xs text-red-600">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </TableColumnContent>
                    <TableColumnContent >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <p className="mr-3 italic">Name: </p>
                          <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                            {item.restaurant?.name}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Contact: </p>
                          <p className="mr-3 font-extrabold text-xs">
                            {item.restaurant?.contact}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <p className="mr-3 italic"> Rating: </p>
                          <p className="mr-3 font-extrabold text-xs text-red-600">
                            {item.restaurant?.averageRating === 0
                              ? 0
                              : item.restaurant?.averageRating || 4.9}
                          </p>
                        </div>
                      </div>
                    </TableColumnContent>
                    <TableColumnContent >
                      <Button
                        variant="dark"
                        className="px-2 py-1 text-xs rounded-md"
                        onClick={() => {
                          handleOpenViewModal();
                          setMenuID(item.id);
                        }}
                      >
                        View Details
                      </Button>
                    </TableColumnContent>
                </TableRow>
              })}
          </TableComponent>


      </PaginatedTable>
    </>
  );
};

export default Menus;
