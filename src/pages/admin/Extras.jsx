import { useCallback, useState } from "react";
import {
  useDeleteExtra,
  useExtraListPaged,
  useGetActiveUser,
} from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import { useLocation } from "react-router";
import PaginatedTable from "../../components/PaginatedTable";
import TableComponent from "../../components/reusableComponents/TableComponent";
import TableRow from "../../components/reusableComponents/TableRow";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import { handleFilterChange, sortByColumn } from "../../utils/config";
import FilterComponent from "../../components/reusableComponents/FilterComponent";
import FilterType from "../../components/reusableComponents/FilterType";
import RenderActiveFilters from "../../components/reusableComponents/RenderActiveFilters";
import ErrorOccured from "../../components/notices/ErrorOccured";
import Spinner from "../../components/loaders/Spinner";
import { GiKetchup } from "react-icons/gi";
import AddMenuModal from "../../components/modal/restaurant/AddMenuModal";
import { LuDot } from "react-icons/lu";
import ViewMenuExtraModal from "../../components/modal/restaurant/ViewMenuExtraModal";
import PropTypes from "prop-types";
import DeleteModal from "../../components/modal/restaurant/DeleteModal";
import { FaTrash } from "react-icons/fa6";

const Extras = ({ id, top }) => {
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [extraID, setExtraID] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { mutationFn } = useDeleteExtra(extraID && extraID);

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

  const {
    data: menuListAlt = [],
    isLoading: isMenuLoading,
    hasNextPage: menuHasNextPage,
    isFetchingNextPage: menuFetchingNextPage,
    isError: isMenuAltError,
    refetch,
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

  let extraData = menuListAlt?.pages?.flatMap((page) => page?.data);
  const numberOfPages = extraData?.[0].totalPages;

  const tablehead = [
    { title: "Name", sortable: true, sortKey: "NAME" },
    { title: "Price", sortable: true, sortKey: "PRICE" },
    { title: "Restaurant Name", sortable: false },
    { title: "Action", sortable: false },
  ];

  const tabledata = extraData?.[0].results;

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
        type={"extra"}
      />

      <ViewMenuExtraModal
        setOpen={setViewOpen}
        open={viewOpen}
        right={"right-[20px]"}
        top={"top-[20px]"}
        refetch={refetch}
        extraID={extraID}
      />

      <DeleteModal
        isOpen={openDelete}
        action={"EXTRA"}
        handleCancel={handleCloseDeleteModal}
        mutationFn={mutationFn}
        refetch={refetch}
        width="400px"
      />
      {pathname == "/dashboard/extras" && (
        <div className="mt-2 flex flex-col gap-2">
          <p className="font-bold text-2xl">Extras</p>
          <div className="flex justify-end">
            <Button
              variant="primary"
              className="px-2 py-2 text-sm"
              rounded
              onClick={() => {
                handleOpenModal();
              }}
            >
              Add Extras
            </Button>
          </div>
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
        list={extraData}
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
                      <div className="flex items-center">
                        <p className="text-xs font-light uppercase text-xs text-gray-500">
                          EXTRA
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
                  <div className="flex gap-1">
                    <Button
                      variant="danger"
                      className="px-2 py-1 text-xs rounded-md"
                      onClick={() => {
                        setExtraID(item.id);
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
                        setExtraID(item.id);
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

export default Extras;

Extras.propTypes = {
  id: PropTypes.string,
  top: PropTypes.string,
};
