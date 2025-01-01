import { useCallback, useState } from "react";
import {
  useDeleteMenu,
  useGetActiveUser,
  useMenuListPaged,
} from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
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
import AddMenuModal from "../../components/modal/restaurant/AddMenuModal";
import ViewMenuExtraModal from "../../components/modal/restaurant/ViewMenuExtraModal";
import { LuDot } from "react-icons/lu";
import { FaTrash } from "react-icons/fa6";
import DeleteModal from "../../components/modal/restaurant/DeleteModal";

const Menus = ({ id, top, show }) => {
  const { pathname } = useLocation();
  const { categories } = useCategoryList();
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [menuID, setMenuID] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { mutationFn } = useDeleteMenu(menuID && menuID);

  const {
    data: activeUser,
    isLoading: activeUserLoading,
    // isError: isActiveUserError,
    // error: activeUserError,
  } = useGetActiveUser();

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

  const {
    data: menuListAlt = [],
    isLoading: isMenuLoading,
    hasNextPage: menuHasNextPage,
    isFetchingNextPage: menuFetchingNextPage,
    isError: isMenuAltError,
    refetch,
  } = useMenuListPaged(
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
    { title: "Category", sortable: true, sortKey: "CATEGORY" },
    { title: "Action", sortable: false },
  ];

  const tabledata = menuData?.[0].results;

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);
  const handleOpenViewModal = useCallback(() => {
    setViewOpen(true);
  }, []);
  const handleOpenDeleteModal = useCallback(() => {
    setOpenDelete(true);
  }, []);
  const handleCloseDeleteModal = useCallback(() => {
    setOpenDelete(false);
  }, []);

  if (activeUserLoading) {
    return <Spinner />;
  }

  if (isMenuAltError) {
    return <ErrorOccured />;
  }

  return (
    <>
      <AddMenuModal
        setOpen={setOpen}
        open={open}
        right={"right-[20px]"}
        top={"top-[20px]"}
        refetch={refetch}
      />
      <ViewMenuExtraModal
        setOpen={setViewOpen}
        open={viewOpen}
        right={"right-[20px]"}
        top={"top-[20px]"}
        refetch={refetch}
        menuID={menuID}
      />
      <DeleteModal
        isOpen={openDelete}
        action={"MENU"}
        handleCancel={handleCloseDeleteModal}
        mutationFn={mutationFn}
        refetch={refetch}
        width="400px"
      />

      {pathname == "/dashboard/menus" && (
        <div className="mt-2 flex flex-col gap-2">
          <p className="font-bold text-2xl">Menus</p>
          <div className="flex justify-end">
            <Button
              variant="primary"
              className="px-2 py-2 text-sm"
              rounded
              onClick={() => {
                handleOpenModal();
              }}
            >
              Add Menus
            </Button>
          </div>
        </div>
      )}

      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        type={"menus"}
        right={"right-[20px]"}
        top={top || "top-[-160px]"}
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
            const category = categories.find(
              (category) => category.value == item.category
            );

            return (
              <TableRow key={idx} index={idx}>
                <TableColumnContent>
                  <div className="flex gap-2">
                    <div className="rounded-full px-2 py-2 border bg-gray-100 uppercase font-extrabold text-xl">
                      <img
                        src={category?.icon}
                        alt="icon"
                        width="20px"
                        className=""
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <p className="mr-3 font-bold">{item.name}</p>

                      <div className="flex items-center">
                        <p className="text-xs font-light uppercase text-xs text-gray-500">
                          MENU
                        </p>
                        <LuDot />
                        {item.visible ? (
                          <p className=" text-xs font-light text-green-600">
                            visible
                          </p>
                        ) : (
                          <p className=" text-xs font-light text-red-600">
                            not visible
                          </p>
                        )}
                      </div>
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
                <TableColumnContent>
                  <div className="flex">
                    <div
                      className={`font-bold rounded-full text-xs px-3 py-1 ${category?.color} ${category?.text}`}
                    >
                      <p className=" uppercase">{category?.label}</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex gap-1">
                    <Button
                      variant="danger"
                      className="px-2 py-1 text-xs rounded-md"
                      onClick={() => {
                        setMenuID(item.id);
                        handleOpenDeleteModal();
                      }}
                    >
                      <FaTrash />
                    </Button>
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
                  </div>
                </TableColumnContent>
              </TableRow>
            );
          })}
        </TableComponent>
      </PaginatedTable>
    </>
  );
};

export default Menus;
