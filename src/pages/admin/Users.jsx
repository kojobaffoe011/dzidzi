import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useUserListPaged } from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import AddCredentialModal from "../../components/modal/restaurant/AddCredentialModal";
import ErrorOccured from "../../components/notices/ErrorOccured";
import PaginatedTable from "../../components/PaginatedTable";
import TableComponent from "../../components/reusableComponents/TableComponent";
import TableRow from "../../components/reusableComponents/TableRow";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import FilterType from "../../components/reusableComponents/FilterType";
import { BiXCircle } from "react-icons/bi";
import { HiUser } from "react-icons/hi";
import FilterComponent from "../../components/reusableComponents/FilterComponent";
import {
  activeFilters,
  clearSingleFilter,
  handleFilterChange,
  sortByColumn,
} from "../../utils/config";
import RenderActiveFilters from "../../components/reusableComponents/RenderActiveFilters";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState([
    { name: "name", value: null, enabled: false },
    { name: "lastName", value: null, enabled: false },
    { name: "enabled", value: null, enabled: false },
    { name: "Email", value: null, enabled: false },
    { name: "Username", value: null, enabled: false },
    { name: "userId", value: null, enabled: false },
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

  const [credentialOpen, setCredentialsOpen] = useState(false);

  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);

  const {
    data: usersList = [],
    isLoading: usersLoading,
    hasNextPage: usersHasNextPage,
    isFetchingNextPage: usersFetchingNextPage,
    isError: isUsersError,
  } = useUserListPaged(
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
    currentPage
  );

  let userData = usersList?.pages?.flatMap((page) => page?.data);
  const numberOfPages = userData?.[0].totalPages;

  const tabledata = userData?.[0].results;

  if (isUsersError) {
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

      <div className="mt-2 flex-col gap-2">
        <p className="font-bold text-2xl">Users</p>
      </div>

      <FilterComponent
        filters={filters}
        setFilters={setFilters}
        activeFilters={activeFilters(filters)}
      >
        <FilterType
          filterType={"INPUTFIELD"}
          handleFilterChange={(event) =>
            handleFilterChange(event, "name", filters, setFilters)
          }
          placeholder={"Name"}
        />
        <FilterType
          filterType={"INPUTFIELD"}
          handleFilterChange={(event) =>
            handleFilterChange(event, "Email", filters, setFilters)
          }
          placeholder={"Email"}
        />
        <FilterType
          filterType={"INPUTFIELD"}
          handleFilterChange={(event) =>
            handleFilterChange(event, "Username", filters, setFilters)
          }
          placeholder={"Username"}
        />
      </FilterComponent>

      {/* {renderActiveFilters()} */}
      <RenderActiveFilters filters={filters} setFilters={setFilters} />

      <PaginatedTable
        title={"No Orders Found"}
        list={userData}
        totalCount={6}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={usersLoading}
        numberOfPages={numberOfPages}
        isFetchingNextPage={usersFetchingNextPage}
        dataHasNextPage={usersHasNextPage}
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
                      <p className="mr-3 text-xs font-light">
                        @{item?.credential.username}
                      </p>
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
  );
};

export default Users;
