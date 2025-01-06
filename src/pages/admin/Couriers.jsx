import { useCallback, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  useCourierListPaged,
  useGetActiveUser,
} from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import {
  activeFilters,
  handleFilterChange,
  sortByColumn,
} from "../../utils/config";
import PaginatedTable from "../../components/PaginatedTable";
import TableComponent from "../../components/reusableComponents/TableComponent";
import TableRow from "../../components/reusableComponents/TableRow";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import { HiUser } from "react-icons/hi";
import RenderActiveFilters from "../../components/reusableComponents/RenderActiveFilters";
import FilterType from "../../components/reusableComponents/FilterType";
import FilterComponent from "../../components/reusableComponents/FilterComponent";
import ErrorOccured from "../../components/notices/ErrorOccured";
import AddUserRoleModal from "../../components/modal/restaurant/AddUserRoleModal";
import { LuDot } from "react-icons/lu";

const Couriers = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { pathname } = useLocation();
  const [filters, setFilters] = useState([
    { name: "NAME", value: null, enabled: false },
    { name: "LASTNAME", value: null, enabled: false },
    { name: "EMAIL", value: null, enabled: false },
    { name: "USERNAME", value: null, enabled: false },
    { name: "AVG RATING", value: null, enabled: false },
    { name: "STATUS", value: null, enabled: false },
    { name: "COURIER ID", value: null, enabled: false },
    { name: "sortBy", value: null, enabled: false },
    { name: "orderBy", value: null, enabled: false },
  ]);

  const tablehead = [
    { title: "Name", sortable: true, sortKey: "FIRSTNAME" },
    { title: "Phone", sortable: false },
    { title: "Email", sortable: false },
    { title: "Address", sortable: false },
    { title: "Action", sortable: false },
  ];

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const {
    data: courierList = [],
    isLoading: courierLoading,
    hasNextPage: courierHasNextPage,
    isFetchingNextPage: courierFetchingNextPage,
    isError: isCourierError,
    refetch,
  } = useCourierListPaged(
    //firstname
    filters[0].enabled ? filters[0].value : null,
    //lastname
    filters[1].enabled ? filters[1].value : null,
    filters[2].enabled ? filters[2].value : null,
    filters[3].enabled ? filters[3].value : null,
    filters[4].enabled ? filters[4].value : null,
    filters[5].enabled ? filters[5].value : null,
    filters[6].enabled ? filters[6].value : null,
    filters[7].enabled ? filters[7].value : null,
    filters[8].enabled ? filters[7].value : null,
    currentPage
  );

  const {
    data: activeUser,
    isLoading: activeUserLoading,
    // isError: isActiveUserError,
    // error: activeUserError,
  } = useGetActiveUser();

  let courierData = courierList?.pages?.flatMap((page) => page?.data);
  const numberOfPages = courierData?.[0].totalPages;

  const tabledata = courierData?.[0].results;

  if (isCourierError) {
    return <ErrorOccured />;
  }
  return (
    <>
      <AddUserRoleModal
        setOpen={setOpen}
        open={open}
        right={"right-[20px]"}
        top={"top-[20px]"}
        refetch={refetch}
        userRole="COURIER"
        title={"Add new courier"}
        subtext={"Fill form to add a new courier"}
      />

      <div className="mt-2 flex-col gap-2">
        <p className="font-bold text-2xl">Couriers</p>
        {pathname == "/dashboard/couriers" && (
          <div className="flex justify-end">
            {activeUser?.currentUserRole.includes("RESTAURANT") && (
              <Button
                variant="primary"
                className="px-2 py-2 text-sm"
                rounded
                onClick={() => {
                  handleOpenModal();
                }}
              >
                Add Courier
              </Button>
            )}
          </div>
        )}
      </div>
      <>
        <FilterComponent
          filters={filters}
          setFilters={setFilters}
          activeFilters={activeFilters(filters)}
          top={"top-[-120px]"}
        >
          <FilterType
            filterType={"INPUTFIELD"}
            handleFilterChange={(event) =>
              handleFilterChange(event, "NAME", filters, setFilters)
            }
            placeholder={"Name"}
          />
          <FilterType
            filterType={"INPUTFIELD"}
            handleFilterChange={(event) =>
              handleFilterChange(event, "EMAIL", filters, setFilters)
            }
            placeholder={"Email"}
          />
          <FilterType
            filterType={"INPUTFIELD"}
            handleFilterChange={(event) =>
              handleFilterChange(event, "USERNAME", filters, setFilters)
            }
            placeholder={"Username"}
          />
        </FilterComponent>

        <RenderActiveFilters filters={filters} setFilters={setFilters} />

        <PaginatedTable
          title={"No Orders Found"}
          list={courierData}
          totalCount={6}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isLoading={courierLoading || activeUserLoading}
          numberOfPages={numberOfPages}
          isFetchingNextPage={courierFetchingNextPage}
          dataHasNextPage={courierHasNextPage}
        >
          <TableComponent
            tablehead={tablehead}
            tabledata={tabledata}
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
                        <HiUser
                          className="text-slate-400 cursor-pointer"
                          size={"20px"}
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <p className="mr-3 font-bold">
                          {item?.firstName} {item?.lastName}
                        </p>

                        <div className="flex items-center">
                          <p className="text-xs font-light">
                            @{item?.credential.username}
                          </p>
                          <LuDot />
                          {item?.status == "ONLINE" ? (
                            <p className=" text-xs font-light text-green-600">
                              online
                            </p>
                          ) : (
                            <p className=" text-xs font-light text-red-600">
                              offline
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TableColumnContent>
                  <TableColumnContent>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <p className="mr-3 ">{item?.contact}</p>
                      </div>
                    </div>
                  </TableColumnContent>
                  <TableColumnContent>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <p className="mr-3 ">{item?.credential.email}</p>
                      </div>
                    </div>
                  </TableColumnContent>
                  <TableColumnContent>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <p className="mr-3 ">
                          {item?.address?.street} {item?.address?.houseNumber},{" "}
                          {item?.address?.city}
                        </p>
                      </div>
                    </div>
                  </TableColumnContent>
                  <TableColumnContent>
                    <Link to={`${item?.id}`}>
                      <Button
                        variant="dark"
                        className="px-2 py-1 text-xs rounded-md"
                      >
                        View Details
                      </Button>
                    </Link>
                  </TableColumnContent>
                </TableRow>
              );
            })}
          </TableComponent>
        </PaginatedTable>
      </>
    </>
  );
};

export default Couriers;
