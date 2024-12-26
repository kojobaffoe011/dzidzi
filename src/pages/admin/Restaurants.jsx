import { useCallback, useState } from "react";
import { useRestaurantListPaged } from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import AddCredentialModal from "../../components/modal/restaurant/AddCredentialModal";
import ViewRestaurant from "../../components/modal/restaurant/ViewRestaurant";
import PaginatedTable from "../../components/PaginatedTable";
import TableComponent from "../../components/reusableComponents/TableComponent";
import {
  activeFilters,
  handleFilterChange,
  sortByColumn,
} from "../../utils/config";
import RenderActiveFilters from "../../components/reusableComponents/RenderActiveFilters";
import ErrorOccured from "../../components/notices/ErrorOccured";
import FilterComponent from "../../components/reusableComponents/FilterComponent";
import FilterType from "../../components/reusableComponents/FilterType";
import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import { HiUser } from "react-icons/hi";
import TableRow from "../../components/reusableComponents/TableRow";
import { Link } from "react-router-dom";
import { LuDot } from "react-icons/lu";

const Restaurants = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState([
    { name: "name", value: null, enabled: false },
    { name: "email", value: null, enabled: false },
    { name: "username", value: null, enabled: false },
    { name: "rating", value: null, enabled: false },
    { name: "visible", value: null, enabled: false },
    { name: "parentRestaurantId", value: null, enabled: false },
    { name: "distance", value: null, enabled: false },
    { name: "latitude", value: null, enabled: false },
    { name: "longitude", value: null, enabled: false },
    { name: "restaurantId", value: null, enabled: false },
    { name: "sortBy", value: null, enabled: false },
    { name: "orderBy", value: null, enabled: false },
  ]);

  const tablehead = [
    { title: "Name", sortable: true, sortKey: "NAME" },
    { title: "Rating", sortable: true, sortKey: "RATING" },
    { title: "Phone", sortable: false },
    { title: "Email", sortable: false },
    { title: "Address", sortable: false },
    { title: "Action", sortable: false },
  ];

  const [credentialOpen, setCredentialsOpen] = useState(false);

  const handleOpenInvoiceModal = useCallback(() => {
    setCredentialsOpen(true);
  }, []);
  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);

  const [restaurantID, setRestaurantID] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const handleOpenViewModal = useCallback(() => {
    setViewOpen(true);
  }, []);
  const handleCloseViewModal = useCallback(() => {
    setViewOpen(false);
  }, []);

  const {
    data: restaurantList = [],
    isLoading: restaurantLoading,
    hasNextPage: restaurantHasNextPage,
    isFetchingNextPage: restaurantFetchingNextPage,
    isError: isRestaurantError,
  } = useRestaurantListPaged(
    //name
    filters[0].enabled ? filters[0].value : null,
    //email
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

  let restaurantData = restaurantList?.pages?.flatMap((page) => page?.data);
  const numberOfPages = restaurantData?.[0]?.totalPages;
  const tabledata = restaurantData?.[0].results;

  if (isRestaurantError) {
    return <ErrorOccured />;
  }

  const renderRating = (rating) => {
    if (rating === null || rating === 0) {
      return (
        <div className="flex">
          <div className="rounded-full text-xs font-bold bg-gray-200 text-gray-500 px-3 py-1">
            <p>N/A</p>
          </div>
        </div>
      );
    }
    return rating;
  };

  const renderVisiblity = (visibility) => {
    if (visibility) {
      return (
        <>
          <p className=" text-xs font-light text-green-600">open</p>
        </>
      );
    }
    return (
      <>
        <p className=" text-xs font-light text-red-600">closed</p>
      </>
    );
  };

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
      />

      <div className="mt-2 flex-col gap-2">
        <p>Restaurants</p>
        <div className="flex justify-end">
          <Button
            variant="primary"
            className="px-2 py-2 text-sm"
            rounded
            onClick={() => {
              handleOpenInvoiceModal();
            }}
          >
            Add Restaurant
          </Button>
        </div>
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

      <RenderActiveFilters filters={filters} setFilters={setFilters} />

      <PaginatedTable
        title={"No Orders Found"}
        list={restaurantData}
        totalCount={6}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={restaurantLoading}
        numberOfPages={numberOfPages}
        isFetchingNextPage={restaurantFetchingNextPage}
        dataHasNextPage={restaurantHasNextPage}
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
                      <p className=" font-bold">{item.name}</p>
                      <div className="flex items-center">
                        <p className=" text-xs font-light">
                          @{item.credential.username}
                        </p>
                        <LuDot />
                        {renderVisiblity(item.visible)}
                      </div>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  {renderRating(item.averageRating)}
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className=" ">{item?.contact}</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className=" ">{item?.credential.email}</p>
                    </div>
                  </div>
                </TableColumnContent>
                <TableColumnContent>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <p className=" ">
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

export default Restaurants;
