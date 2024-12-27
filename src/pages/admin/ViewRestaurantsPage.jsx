import { useCallback } from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Outlet, useLocation, useParams } from "react-router";
import {
  useGetSingleRestaurant,
  useDeleteRestaurant,
  useMenuListPaged,
} from "../../components/brokers/apicalls";
import Spinner from "../../components/loaders/Spinner";
import RestaurantDescription from "../../components/reusableComponents/RestaurantDescription";
import DeleteModal from "../../components/modal/restaurant/DeleteModal";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import Imageloader from "../../components/loaders/Imageloader";
import DzidziLoader from "../../components/loaders/DzidziLoader";
import ErrorOccured from "../../components/notices/ErrorOccured";
import { useNavigateTo } from "../../hooks/useNavigateTo";
import Menus from "./Menus";
import TabComponent from "../../components/reusableComponents/TabComponent";

const UserView = ({
  menuData,
  pathname,
  menuHasNextPage,
  menuFetchNextPage,
  menuFetchingNextPage,
  navigateTo,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <p className="text-2xl font-bold">Menu</p>
        <div className="grid grid-cols-3 gap-2">
          {menuData?.map((item, idx) => {
            return (
              <div
                className="flex flex-col"
                key={idx}
                onClick={() =>
                  navigateTo(
                    pathname.includes("dashboard")
                      ? ""
                      : `/details/menu/revieworder/${item.restaurant.id}/${item.id}`
                  )
                }
              >
                <div className="flex rounded overflow-hidden cursor-pointer border mb-2 items-center justify-between gap-3 p-1 border border-gray-500">
                  <div className="overflow-hidden basis-1/3 h-full">
                    <Imageloader
                      imageID={item?.image?.id}
                      classNames={"object-center w-[100px] h-[100px]"}
                    />
                  </div>
                  <div className="p-1 flex justify-between items-center basis-2/3 w-full h-full group">
                    <div className="flex flex-col w-full gap-1">
                      <p className="font-bold text-xs font-thin">
                        <span className="italic text-gray-500">Name: </span>{" "}
                        {item?.name}
                      </p>
                      <p className="font-bold text-xs text-green-500">
                        <span className="italic text-gray-500 font-thin">
                          Price:{" "}
                        </span>{" "}
                        ${item?.price}
                      </p>
                      <p className="text-gray-700 text-xs font-bold"></p>
                      <p className="text-xs whitespace-nowrap">
                        {item?.description}
                      </p>
                      <div className="flex justify-between  item-center">
                        <button className="flex px-2 rounded-full text-xs bg-gray-100 text-gray-600 items-center font-bold">
                          {item?.category}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {menuHasNextPage && (
          <div className="flex justify-center my-4">
            <button
              className="border border-gray-500 px-8 py-2 bg-gray-100 font-bold rounded hover:bg-gray-200"
              onClick={() => {
                menuFetchNextPage();
              }}
            >
              {menuFetchingNextPage ? (
                <Spinner color="blue" size="20px" />
              ) : (
                <p className="text-xs">Load more</p>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// const TabComponent = () => {
//   const tabs = [
//     {
//       name: "Branches",
//       url: "",
//     },
//     {
//       name: "Menus",
//       url: "",
//     },
//     {
//       name: "Extras",
//       url: "",
//     },
//   ];

//   return (
//     <div className="flex ">
//       <div className="p-1 flex rounded-md gap-1 bg-slate-50">
//         {tabs?.map((tab, idx) => {
//           return (
//             <div
//               key={idx}
//               className={`px-6 py-2 border hover:cursor-pointer rounded-sm hover:border hover:border-blue-200 hover:border-2 hover:bg-blue-50 hover:shadow-md ${
//                 idx == 0
//                   ? "border border-blue-200 border-2 bg-blue-50 shadow-md"
//                   : "border border-gray-200 border-2 bg-white"
//               }`}
//             >
//               <p
//                 className={`text-xs font-bold hover:text-blue-600 ${
//                   idx == 0 ? "text-blue-600 " : ""
//                 }`}
//               >
//                 {tab.name}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

const ViewRestaurantsPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { navigateTo } = useNavigateTo();
  const [credentialOpen, setCredentialsOpen] = useState(false);

  const handleOpenInvoiceModal = useCallback(() => {
    setCredentialsOpen(true);
  }, []);
  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);

  const tabs = [
    {
      name: "Branches",
      url: "",
    },
    {
      name: "Menus",
      url: "menus",
    },
    {
      name: "Extras",
      url: "extras",
    },
  ];

  const [filters, setFilters] = useState({
    minimumPrice: null,
    maximumPrice: null,
    name: null,
    category: null,
    rating: null,
    visible: null,
    distance: null,
    latitude: null,
    longitude: null,
    restaurantID: id,
    sortBy: null,
    orderBy: null,
  });

  const {
    isLoading: restaurantLoading,
    data: restaurantData,
    isError,
    error,
  } = useGetSingleRestaurant(id);

  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: menuListAlt = [],
    isLoading: isMenuLoading,
    hasNextPage: menuHasNextPage,
    isFetchingNextPage: menuFetchingNextPage,
    fetchNextPage: menuFetchNextPage,
    isError: isMenuAltError,
  } = useMenuListPaged(
    filters.minimumPrice,
    filters.maximumPrice,
    filters.name,
    filters.category,
    filters.rating,
    filters.visible,
    filters.distance,
    filters.latitude,
    filters.longitude,
    filters.restaurantID,
    filters.sortBy,
    filters.orderBy,
    currentPage
  );

  let menuData = menuListAlt?.pages?.flatMap((page) => page?.data?.results);
  // const numberOfPages = menuData?.[0]?.totalPages

  const { mutationFn } = useDeleteRestaurant(id);

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      showSuccessToast("Restaurant Deleted Successfully");
      navigateTo("/dashboard");
      // reset();
    },
    onError: (data) => {
      showErrorToast(data?.response?.error);
    },
  });

  const handleDelete = () => {
    try {
      mutate({});
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  if (restaurantLoading || isMenuLoading) {
    return (
      <div>
        <DzidziLoader />
      </div>
    );
  }

  if (isMenuAltError) {
    <ErrorOccured />;
  }
  return (
    <>
      <DeleteModal
        isOpen={credentialOpen}
        handleCancel={handleCloseInvoiceModal}
        userRole={"RESTAURANT_ADMIN"}
        width="400px"
        action={"RESTAURANT_ADMIN"}
        deleteItem={handleDelete}
        isLoading={isPending}
      />
      <div>
        <RestaurantDescription
          name={restaurantData?.name}
          rating={restaurantData?.averageRating}
          address={`${restaurantData?.address.street} ${restaurantData?.address.houseNumber}, ${restaurantData?.address.city}`}
          type={pathname.includes("detail") ? "" : "modal"}
          deleteFunction={handleOpenInvoiceModal}
        >
          {pathname.includes("detail") ? (
            <UserView
              menuData={menuData}
              pathname={pathname}
              menuHasNextPage={menuHasNextPage}
              menuFetchNextPage={menuFetchNextPage}
              menuFetchingNextPage={menuFetchingNextPage}
              navigateTo={navigateTo}
            />
          ) : (
            <>
              <TabComponent tabs={tabs} />

              <Outlet />
            </>
          )}
        </RestaurantDescription>
      </div>
    </>
  );
};

export default ViewRestaurantsPage;
