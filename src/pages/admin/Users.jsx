import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  useUserListPaged,
} from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import AddCredentialModal from "../../components/modal/restaurant/AddCredentialModal";
import ErrorOccured from "../../components/notices/ErrorOccured";
import PaginatedTable from "../../components/PaginatedTable";
import TableComponent from "../../components/reusableComponents/TableComponent";
import TableRow from "../../components/reusableComponents/TableRow";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import FilterComponent from "../../components/reusableComponents/FilterComponent";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilters] = useState({
  firstName: null,
  lastName:null,
  enabled:null,
  email:null,
  username:null,
  userId:null,
  sortBy:null,
  orderBy:null,
  })

  const [credentialOpen, setCredentialsOpen] = useState(false);

  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);



  const {
    data: usersList = [],
    isLoading: usersLoading,
    hasNextPage: usersHasNextPage,
    // fetchNextPage: usersFetchNextPage,
    isFetchingNextPage: usersFetchingNextPage,
    isError: isUsersError,
  } = useUserListPaged(
  filter.firstName, 
  filter.lastName, 
  filter.enabled,
  filter.email,
  filter.username,
  filter.userId,
  filter.sortBy,
  filter.orderBy,
  currentPage
  );


  let userData = usersList?.pages?.flatMap((page) => page?.data);
  const numberOfPages = userData?.[0].totalPages

  const tablehead = [
    {title: 'Restaurant Details'},
    {title: 'Address'},
    // {title: 'Status'},
    // {title: 'Address'},
    {title: 'Action'},
  ]

  const tabledata = userData?.[0].results

  if(isUsersError){
    return <ErrorOccured/>
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

      <FilterComponent filterType={'INPUTFIELD'} handleFilterChange={(event)=>setFilters({...filter, firstName:event.target.value})}/>
        
      <PaginatedTable
       title={'No Orders Found'}
       list={userData} 
       totalCount={6} 
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}
       isLoading={usersLoading}
       numberOfPages={numberOfPages}
       isFetchingNextPage={usersFetchingNextPage}
       dataHasNextPage={usersHasNextPage}
      >
          <TableComponent tablehead={tablehead} tabledata={tabledata}>
              {tabledata?.map((item, idx)=>{
                return (
                <TableRow key={idx} index={idx}>
                    <TableColumnContent>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <p className="mr-3 ">Name: </p>
                        <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                          {item?.firstName} {item?.lastName}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 "> Contact: </p>
                        <p className="mr-3 font-extrabold text-xs">
                          {item?.contact}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 "> Email: </p>
                        <p className="mr-3 font-extrabold text-xs text-red-600">
                          {item?.credential?.email}
                        </p>
                      </div>
                    </div>
                  </TableColumnContent>
                  <TableColumnContent>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <p className="mr-3 ">Street: </p>
                        <span className="p-1 text-xs uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 font-extrabold">
                          {item?.address?.street}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 "> House Number: </p>
                        <p className="mr-3 font-extrabold text-xs">
                          {item?.address?.houseNumber}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 "> City: </p>
                        <p className="mr-3 font-extrabold text-xs text-red-600">
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
                        // onClick={() => {
                        //   handleOpenViewModal();
                        //   setRestaurantID(item?.id);
                        // }}
                      >
                        View Details
                      </Button>
                    </Link>
                  </TableColumnContent>
                </TableRow>
                )
              })}
          </TableComponent>
      </PaginatedTable>
    </>
  );
};

export default Users;
