import { useCallback, useState } from "react";
import {
  useExtraListPaged,
  useGetActiveUser,
  useGetSingleExtra,
  useGetSingleMenu,
  useMenuListPaged,
} from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import AddCredentialModal from "../../components/modal/restaurant/AddCredentialModal";
import ViewRestaurant from "../../components/modal/restaurant/ViewRestaurant";
import { useLocation } from "react-router";
import PaginatedTable from "../../components/PaginatedTable";
import TableComponent from "../../components/reusableComponents/TableComponent";
import TableRow from "../../components/reusableComponents/TableRow";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import { useCategoryList } from "../../hooks/useCategoryList";
import { handleFilterChange, sortByColumn } from "../../utils/config";
import FilterComponent from "../../components/reusableComponents/FilterComponent";
import FilterType from "../../components/reusableComponents/FilterType";
import RenderActiveFilters from "../../components/reusableComponents/RenderActiveFilters";
import ErrorOccured from "../../components/notices/ErrorOccured";
import Spinner from "../../components/loaders/Spinner";
import { HiUser } from "react-icons/hi";
import { GiKetchup } from "react-icons/gi";

const Extras = ({ id, top, show }) => {
  const {
    data: activeUser,
    isLoading: activeUserLoading,
    // isError: isActiveUserError,
    // error: activeUserError,
  } = useGetActiveUser();
  const { pathname } = useLocation();
  const [filters, setFilters] = useState([
    { name: "Minimum Price", value: null, enabled: false },
    { name: "Maximum Price", value: null, enabled: false },
    { name: "Name", value: null, enabled: false },
    { name: "Category", value: null, enabled: false },
    { name: "Rating", value: null, enabled: false },
    { name: "Visible", value: null, enabled: false },
    { name: "Distance", value: null, enabled: false },
    { name: "Latitude", value: null, enabled: false },
    { name: "Longitude", value: null, enabled: false },
    {
      name: "RESTAURANT ID",
      value:
        activeUser?.currentUserRole == "RESTAURANT_ADMIN" ||
        activeUser?.currentUserRole == "RESTAURANT_BRANCH" ||
        pathname.includes("restaurant")
          ? id || activeUser?.currentUserId
          : null,
      enabled: true,
    },
    { name: "sortBy", value: null, enabled: false },
    { name: "orderBy", value: null, enabled: false },
  ]);
  const [menuID, setMenuID] = useState(null);
  const { categories } = useCategoryList();

  const [credentialOpen, setCredentialsOpen] = useState(false);
  const handleOpenInvoiceModal = useCallback(() => {
    setCredentialsOpen(true);
  }, []);
  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);

  const [restaurantID, setRestaurantID] = useState(
    activeUser?.currentUserRole == "RESTAURANT_ADMIN" ||
      activeUser?.currentUserRole == "RESTAURANT_BRANCH"
      ? [activeUser?.currentUserId]
      : null
  );
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
  } = useExtraListPaged(
    //min price
    filters[0].enabled ? filters[0].value : null,
    //max price
    filters[1].enabled ? filters[1].value : null,
    filters[2].enabled ? filters[2].value : null,
    filters[3].enabled ? filters[3].value : null,
    filters[4].enabled ? filters[4].value : null,
    filters[5].enabled ? filters[5].value : null,
    filters[6].enabled ? filters[6].value : null,
    filters[7].enabled ? filters[7].value : null,
    filters[8].enabled ? filters[8].value : null,
    filters[9].enabled ? filters[9].value : null,
    filters[10].enabled ? filters[10].value : null,
    filters[11].enabled ? filters[11].value : null,
    currentPage
  );

  let menuData = menuListAlt?.pages?.flatMap((page) => page?.data);
  const numberOfPages = menuData?.[0].totalPages;

  const tablehead = [
    { title: "Name", sortable: true, sortKey: "NAME" },
    { title: "Price", sortable: true, sortKey: "PRICE" },
    { title: "Restaurant Name", sortable: false },
    // { title: "Category", sortable: true, sortKey: "CATEGORY" },
    { title: "Action", sortable: false },
  ];

  const tabledata = menuData?.[0].results;

  const {
    isLoading: restaurantLoading,
    data: restaurantData,
    // isError,
    // error,
  } = useGetSingleExtra(menuID);

  if (activeUserLoading) {
    return <Spinner />;
  }

  if (isMenuAltError) {
    return <ErrorOccured />;
  }

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

      {show && (
        <div className="mt-2 flex-col gap-2">
          <p className="font-bold text-2xl">Menus</p>
        </div>
      )}

      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        // activeFilters={activeFilters(filters)}
        type={"menus"}
        top={top || "top-[-120px]"}
      >
        <FilterType
          filterType={"INPUTFIELD"}
          handleFilterChange={(event) =>
            handleFilterChange(event, "Name", filters, setFilters)
          }
          placeholder={"Name"}
        />
        <FilterType
          filterType={"INPUTFIELD"}
          handleFilterChange={(event) =>
            handleFilterChange(event, "email", filters, setFilters)
          }
          placeholder={"Email"}
        />
        <FilterType
          filterType={"INPUTFIELD"}
          handleFilterChange={(event) =>
            handleFilterChange(event, "username", filters, setFilters)
          }
          placeholder={"Username"}
        />
      </FilterComponent>

      <RenderActiveFilters
        filters={filters}
        setFilters={setFilters}
        type={"menus"}
      />
      <PaginatedTable
        title={"No Orders Found"}
        list={menuData}
        totalCount={6}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isMenuLoading}
        numberOfPages={numberOfPages}
        isFetchingNextPage={menuFetchingNextPage}
        dataHasNextPage={menuHasNextPage}
      >
        <TableComponent
          tabledata={tabledata}
          tablehead={tablehead}
          filters={filters}
          setFilters={setFilters}
          sortByColumn={sortByColumn}
        >
          {tabledata?.map((item, idx) => {
            return (
              <TableRow key={idx} index={idx}>
                <TableColumnContent>
                  <div className="flex gap-2">
                    <div className="rounded-full px-2 py-2 border bg-gray-100 uppercase font-extrabold text-xl">
                      <GiKetchup
                        className="text-slate-400 cursor-pointer"
                        size={"20px"}
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <p className="mr-3 font-bold">{item.name}</p>
                      <p className="mr-3 text-xs font-light uppercase text-xs text-gray-500">
                        EXTRA
                      </p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="mr-3 ">€ {Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="mr-3 ">{item.restaurant.name}</p>
                    </div>
                  </div>
                </TableColumnContent>
                {/* <TableColumnContent>
                  <div className="flex">
                    <div
                      className={`font-bold rounded-full text-xs px-3 py-1 ${category?.color} ${category?.text}`}
                    >
                      <p className=" uppercase">{category?.name}</p>
                    </div>
                  </div>
                </TableColumnContent> */}
                <TableColumnContent>
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
            );
          })}
        </TableComponent>
      </PaginatedTable>
    </>
  );
};

export default Extras;