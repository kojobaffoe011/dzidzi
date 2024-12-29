import { useState } from "react";
import {
  useGetActiveUser,
  useTicketListPaged,
} from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import { useLocation } from "react-router";
import PaginatedTable from "../../components/PaginatedTable";
import TableComponent from "../../components/reusableComponents/TableComponent";
import TableRow from "../../components/reusableComponents/TableRow";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import {
  handleFilterChange,
  humanDatetime,
  sortByColumn,
} from "../../utils/config";
import FilterComponent from "../../components/reusableComponents/FilterComponent";
import FilterType from "../../components/reusableComponents/FilterType";
import RenderActiveFilters from "../../components/reusableComponents/RenderActiveFilters";
import ErrorOccured from "../../components/notices/ErrorOccured";
import Spinner from "../../components/loaders/Spinner";
import { renderRating } from "./Restaurants";
import OrderStatus from "../../components/reusableComponents/orderStatus";
import TicketModal from "../../components/modal/restaurant/TicketModal";

const Tickets = ({ top }) => {
  const [ticketID, setTicketID] = useState(null);
  const [open, setOpen] = useState(false);

  const {
    data: activeUser,
    isLoading: activeUserLoading,
    // isError: isActiveUserError,
    // error: activeUserError,
  } = useGetActiveUser();
  const { pathname } = useLocation();
  const [filters, setFilters] = useState([
    {
      name: "USER ID",
      value:
        activeUser?.currentUserRole == "USER"
          ? activeUser?.currentUserId
          : null,
      enabled: activeUser?.currentUserRole == "USER" ? true : false,
    },
    {
      name: "RESTAURANT ID",
      value:
        activeUser?.currentUserRole == "RESTAURANT_ADMIN" ||
        activeUser?.currentUserRole == "RESTAURANT_BRANCH"
          ? activeUser?.currentUserId
          : null,
      enabled:
        activeUser?.currentUserRole == "RESTAURANT_ADMIN" ||
        activeUser?.currentUserRole == "RESTAURANT_BRANCH"
          ? true
          : false,
    },
    {
      name: "COURIER ID",
      value:
        activeUser?.currentUserRole == "COURIER"
          ? activeUser?.currentUserId
          : null,
      enabled: activeUser?.currentUserRole == "COURIER" ? true : false,
    },
    {
      name: "SERVICE ID",
      value: null,
      enabled: false,
      // value:
      //   activeUser?.currentUserRole == "SERVICE"
      //     ? activeUser?.currentUserId
      //     : null,
      // enabled: activeUser?.currentUserRole == "SERVICE" ? true : false,
    },
    { name: "FROM", value: null, enabled: false },
    { name: "TO", value: null, enabled: false },
    { name: "STATUS", value: null, enabled: false },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: ticketList = [],
    isLoading: isTicketLoading,
    hasNextPage: ticketHasNextPage,
    isFetchingNextPage: ticketFetchingNextPage,
    isError: isTicketAltError,
    refetch,
  } = useTicketListPaged(
    //min price
    filters[0].enabled ? filters[0].value : null,
    //max price
    filters[1].enabled ? filters[1].value : null,
    filters[2].enabled ? filters[2].value : null,
    filters[3].enabled ? filters[3].value : null,
    filters[4].enabled ? filters[4].value : null,
    filters[5].enabled ? filters[5].value : null,
    filters[6].enabled ? filters[6].value : null,
    currentPage
  );

  let menuData = ticketList?.pages?.flatMap((page) => page?.data);
  const numberOfPages = menuData?.[0].totalPages;

  const tablehead = [
    { title: "Created by", sortable: true, sortKey: "NAME" },
    { title: "Created on", sortable: false },
    { title: "Status", sortable: false, sortKey: "PRICE" },
    { title: "Resolved on", sortable: false, sortKey: "CATEGORY" },
    { title: "assigned to", sortable: false },
    { title: "action", sortable: false },
  ];

  const tabledata = menuData?.[0].results;

  if (activeUserLoading) {
    return <Spinner />;
  }

  if (isTicketAltError) {
    return <ErrorOccured />;
  }

  return (
    <>
      <TicketModal
        ticketID={ticketID}
        top={"top-[15px]"}
        right={"right-[15px]"}
        setOpen={setOpen}
        open={open}
        refetch={refetch}
      />

      {pathname == "/dashboard/menus" && (
        <div className="mt-2 flex flex-col gap-2">
          <p className="font-bold text-2xl">Menus</p>
        </div>
      )}

      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        // activeFilters={activeFilters(filters)}
        type={"menus"}
        top={top || "top-[-80px]"}
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
        isLoading={isTicketLoading}
        numberOfPages={numberOfPages}
        isFetchingNextPage={ticketFetchingNextPage}
        dataHasNextPage={ticketHasNextPage}
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
                  {item?.restaurant ? (
                    <div className="flex gap-2">
                      {/* <div className="rounded-full px-2 py-2 border bg-gray-100 uppercase font-extrabold text-xl"> */}
                      {/* <img
                          src={category?.icon}
                          alt="icon"
                          width="20px"
                          className=""
                        /> */}
                      {/* </div> */}

                      <div className="flex flex-col justify-center">
                        <p className="mr-3 font-bold">{item.restaurant.name}</p>
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-light uppercase text-xs text-gray-500">
                            {item.restaurant.contact}
                          </p>
                          <p>•</p>
                          {renderRating(item.restaurant.averageRating)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* <div className="flex gap-2">
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
                      <p className="mr-3 text-xs font-light uppercase text-xs text-gray-500">
                        Menu
                      </p>
                    </div>
                  </div> 
                  */}
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="">{humanDatetime(item.createdOn)}</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <OrderStatus orderStatus={item.status} />
                </TableColumnContent>
                <TableColumnContent>
                  {!item.resolvedOn ? (
                    <div className="flex">
                      <div className="rounded-full text-xs font-bold bg-gray-200 text-gray-500 px-3 py-1">
                        <p>N/A</p>
                      </div>
                    </div>
                  ) : (
                    <p className="">{humanDatetime(item.resolvedOn)}</p>
                  )}
                </TableColumnContent>
                <TableColumnContent>
                  {!item.assignedTo ? (
                    <div className="flex">
                      <div className="rounded-full text-xs font-bold bg-gray-200 text-gray-500 px-3 py-1">
                        <p>N/A</p>
                      </div>
                    </div>
                  ) : (
                    item.assignedTo
                  )}
                </TableColumnContent>
                <TableColumnContent>
                  <Button
                    variant="dark"
                    className="px-2 py-1 text-xs rounded-md"
                    onClick={() => {
                      setOpen(true);
                      // openModal();
                      setTicketID(item.id);
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

export default Tickets;
