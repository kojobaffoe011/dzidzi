import { useState } from "react";
import { useOrderListPaged } from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import {
  handleFilterChange,
  humanDatetime,
  sortByColumn,
} from "../../utils/config";
import { useOutletContext } from "react-router";
import OrderStatus from "../../components/reusableComponents/orderStatus";
import FilterComponent from "../../components/reusableComponents/FilterComponent";
import FilterType from "../../components/reusableComponents/FilterType";
import RenderActiveFilters from "../../components/reusableComponents/RenderActiveFilters";
import PaginatedTable from "../../components/PaginatedTable";
import TableComponent from "../../components/reusableComponents/TableComponent";
import TableRow from "../../components/reusableComponents/TableRow";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import { HiUser } from "react-icons/hi";
import { LuDot } from "react-icons/lu";
import OrderModal from "../../components/modal/restaurant/OrderModal";
import useModal from "../../hooks/useModal";

const Orders = () => {
  const [open, setOpen] = useState(false);
  const { openModal } = useModal();
  const [, activeUser] = useOutletContext();
  const [orderID, setOrderID] = useState(null);
  const [filters, setFilters] = useState([
    {
      name: "RESTAURANT ID",
      value:
        activeUser?.currentUserRole == "RESTAURANT_ADMIN" ||
        activeUser?.currentUserRole == "RESTAURANT_BRANCH"
          ? [activeUser?.currentUserId]
          : null,
      enabled: true,
    },
    { name: "COURIER ID", value: null, enabled: false },
    { name: "USER ID", value: null, enabled: false },
    { name: "ORDER ID", value: null, enabled: false },
    // { name: "DATE", value: null, enabled: false },
    { name: "sortBy", value: "DATE", enabled: true },
    { name: "orderBy", value: "DESC", enabled: true },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: data = [],
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    // isError,
  } = useOrderListPaged(
    //RESTAURANT ID
    filters[0].enabled ? filters[0].value : null,
    //COURIER ID
    filters[1].enabled ? filters[1].value : null,
    //USER ID
    filters[2].enabled ? filters[2].value : null,
    //ORDER ID
    filters[3].enabled ? filters[3].value : null,
    //ORDER ID
    // filters[4].enabled ? filters[4].value : null,
    //SORT BY
    filters[4].enabled ? filters[4].value : null,
    //ORDER BY
    filters[5].enabled ? filters[5].value : null,
    currentPage
  );

  const tablehead = [
    { title: "ORDER DETAILS", sortable: true, sortKey: "ORDER_NUMBER" },
    { title: "Price", sortable: true, sortKey: "PRICE" },
    { title: "STATUS", sortable: true, sortKey: "OSTATUS" },
    { title: "USER", sortable: false },
    { title: "COURIER", sortable: false },
    { title: "RESTAURANT NAME", sortable: false },
    { title: "Action", sortable: false },
  ];

  let orderData = data?.pages?.flatMap((page) => page?.data);
  const numberOfPages = orderData?.[0].totalPages;

  const tabledata = orderData?.[0].results;

  return (
    <div>
      <OrderModal
        orderID={orderID}
        top={"top-[17px]"}
        right={"right-[17px]"}
        setOpen={setOpen}
        open={open}
      />

      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        type={"menus"}
        top={"top-[-80px]"}
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
        list={orderData}
        totalCount={6}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
        numberOfPages={numberOfPages}
        isFetchingNextPage={isFetchingNextPage}
        dataHasNextPage={hasNextPage}
      >
        <TableComponent
          tabledata={tabledata}
          tablehead={tablehead}
          filters={filters}
          setFilters={setFilters}
          sortByColumn={sortByColumn}
        >
          {tabledata?.map((item, idx) => {
            // const category = categories.find(
            //   (category) => category.value == item.category
            // );

            return (
              <TableRow key={idx} index={idx}>
                <TableColumnContent>
                  <div className="flex gap-2">
                    {/* <div className="rounded-full px-2 py-2 border bg-gray-100 uppercase font-extrabold text-xl">
                      <HiUser
                        className="text-slate-400 cursor-pointer"
                        size={"20px"}
                      />
                    </div> */}

                    <div className="flex flex-col justify-center">
                      <p className="mr-3 font-bold">{item.orderNumber}</p>
                      <p className="mr-3 text-xs font-light uppercase text-xs text-gray-500">
                        {humanDatetime(item.orderDate)}
                      </p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="mr-3 ">
                        € {Number(item.totalOrderPrice).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <OrderStatus orderStatus={item.status} />
                </TableColumnContent>

                <TableColumnContent>
                  <div className="flex gap-2">
                    <div className="rounded-full px-2 py-2 border bg-gray-100 uppercase font-extrabold text-xl">
                      <HiUser
                        className="text-slate-400 cursor-pointer"
                        size={"20px"}
                      />
                    </div>

                    <div className="flex flex-col justify-center">
                      <p className="mr-3 font-bold">
                        {item.user.firstName} {item.user.lastName}
                      </p>
                      <div className="flex items-center">
                        <p className=" text-xs font-light">
                          {item.user.contact}
                        </p>
                        <LuDot />
                        <p className="mr-3 text-xs font-light uppercase text-xs text-gray-500">
                          {item.address.street} {item.address.houseNumber},{" "}
                          {item.address.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  {item.courier ? (
                    <div className="flex gap-2">
                      <div className="rounded-full px-2 py-2 border bg-gray-100 uppercase font-extrabold text-xl">
                        <HiUser
                          className="text-slate-400 cursor-pointer"
                          size={"20px"}
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <p className="mr-3 font-bold">
                          {item.courier.firstName} {item.courier.lastName}
                        </p>
                        <div className="flex items-center">
                          <p className=" text-xs font-light">
                            {item.courier.contact}
                          </p>
                          {/* <LuDot /> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex">
                      <div className="rounded-full text-xs font-bold bg-gray-200 text-gray-500 px-3 py-1">
                        <p>N/A</p>
                      </div>
                    </div>
                  )}
                </TableColumnContent>

                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className="mr-3 ">{item.restaurant.name}</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <Button
                    variant="dark"
                    className="px-2 py-1 text-xs rounded-md"
                    onClick={() => {
                      setOpen(true);
                      openModal();
                      setOrderID(item?.id);
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
    </div>
  );
};

export default Orders;
