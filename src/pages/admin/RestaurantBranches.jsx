import { useCallback, useState } from "react";
import {
  useDeleteBranches,
  useGetActiveUser,
  useRestaurantBranches,
} from "../../components/brokers/apicalls";
import Button from "../../components/reusableComponents/Button";
import TableComponent from "../../components/reusableComponents/TableComponent";
import ErrorOccured from "../../components/notices/ErrorOccured";

import TableColumnContent from "../../components/reusableComponents/TableColumnContent";
import TableRow from "../../components/reusableComponents/TableRow";
import { Link, useLocation } from "react-router-dom";
import Spinner from "../../components/loaders/Spinner";
import AddBranchModal from "../../components/modal/restaurant/AddBranchModal";
import { sortByColumn } from "../../utils/config";
import { HiUser } from "react-icons/hi";
import { LuDot } from "react-icons/lu";
import { renderRating, renderVisiblity } from "./Restaurants";
import PropTypes from "prop-types";
import DeleteModal from "../../components/modal/restaurant/DeleteModal";

const RestaurantBranches = ({ id }) => {
  const { pathname } = useLocation();
  const { mutationFn } = useDeleteBranches();
  const [openDelete, setOpenDelete] = useState(false);

  const {
    data: activeUser,
    isLoading: activeUserLoading,
    // isError: isActiveUserError,
    // error: activeUserError,
  } = useGetActiveUser();

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

  const [open, setOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleOpenDeleteModal = useCallback(() => {
    setOpenDelete(true);
  }, []);
  const handleCloseDeleteModal = useCallback(() => {
    setOpenDelete(false);
  }, []);

  const {
    data: branches,
    isLoading: branchesLoading,
    isError: isBranchesError,
    refetch,
    // error: branchesError,
  } = useRestaurantBranches(id || activeUser?.currentUserId);

  if (branchesLoading || activeUserLoading) {
    return <Spinner />;
  }

  if (isBranchesError) {
    return <ErrorOccured />;
  }

  return (
    <>
      <AddBranchModal
        setOpen={setOpen}
        open={open}
        right={"right-[20px]"}
        top={"top-[20px]"}
        refetch={refetch}
      />
      <DeleteModal
        isOpen={openDelete}
        action={"coupon"}
        handleCancel={handleCloseDeleteModal}
        mutationFn={mutationFn}
        refetch={refetch}
        width="400px"
      />

      {pathname == "/dashboard/branches" && (
        <div className="mt-2 flex-col gap-2 mb-2">
          <p>Branches</p>
          <div className="flex justify-end">
            <Button
              variant="primary"
              className="px-2 py-2 text-sm"
              rounded
              onClick={() => {
                handleOpenModal();
              }}
            >
              Add Branches
            </Button>
          </div>
        </div>
      )}
      <div className={`${pathname !== "/dashboard/branches" && "mt-4"}`}>
        <TableComponent
          tablehead={tablehead}
          tabledata={branches}
          filters={filters}
          setFilters={setFilters}
          sortByColumn={sortByColumn}
        >
          {branches?.map((item, idx) => {
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
                  {/* <Link to={`${item.id}`}> */}
                  <Button
                    variant="dark"
                    className="px-2 py-1 text-xs rounded-md"
                    onClick={() => handleOpenDeleteModal()}
                  >
                    View Details
                  </Button>
                  {/* </Link> */}
                </TableColumnContent>
              </TableRow>
            );
          })}
        </TableComponent>
      </div>
    </>
  );
};

export default RestaurantBranches;

RestaurantBranches.propTypes = {
  id: PropTypes.string,
  show: PropTypes.bool,
};
