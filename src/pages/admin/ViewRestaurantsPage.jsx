import { useCallback } from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  useGetSingleRestaurant,
  useMenuList,
  useDeleteRestaurant,
} from "../../components/brokers/apicalls";
import Loader from "../../components/loaders/Loader";
import Spinner from "../../components/loaders/Spinner";
import RestaurantDescription from "../../components/reusableComponents/RestaurantDescription";
import DeleteModal from "../../components/modal/restaurant/DeleteModal";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import Imageloader from "../../components/loaders/Imageloader";

const ViewRestaurantsPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [credentialOpen, setCredentialsOpen] = useState(false);

  const handleOpenInvoiceModal = useCallback(() => {
    setCredentialsOpen(true);
  }, []);
  const handleCloseInvoiceModal = useCallback(() => {
    setCredentialsOpen(false);
  }, []);

  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(url);
  };

  const [filters, setFilters] = useState({
    name: null,
    category: null,
    rating: null,
    minPrice: null,
    maxPrice: null,
  });

  const {
    isLoading: restaurantLoading,
    data: restaurantData,
    isError,
    error,
  } = useGetSingleRestaurant(id);

  const {
    data: menuList = [],
    isLoading: menuLoading,
    hasNextPage: menuHasNextPage,
    fetchNextPage: menuFetchNextPage,
    isFetchingNextPage: menuFetchingNextPage,
    isError: ismenuError,
  } = useMenuList(
    filters.name,
    filters.category,
    filters.rating,
    filters.maxPrice,
    filters.maxPrice,
    id
  );

  let pages = menuList?.pages?.flatMap((page) => page?.results);

  const { mutationFn } = useDeleteRestaurant(id);

  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      showSuccessToast("Restaurant Deleted Successfully");
      navigateTo("/dashboard");
      reset();
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

  if (restaurantLoading || menuLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <DeleteModal
        isOpen={credentialOpen}
        handleCancel={handleCloseInvoiceModal}
        userRole={"RESTAURANT"}
        width="400px"
        action={"RESTAURANT"}
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
              <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold">Menu</p>
          <div className="grid grid-cols-3 gap-2">
            {pages?.map((item, idx) => {
              return (
                <div className="flex flex-col" key={idx} onClick={()=> navigateTo( pathname.includes("dashboard") ? "" : `/details/menu/revieworder/${item.value.restaurant.id}/${item.value.id}`)}>
                  <div className="flex rounded overflow-hidden cursor-pointer border mb-2 items-center justify-between gap-3 p-1 border border-gray-500">
                    <div className="overflow-hidden basis-1/3 h-full">
                     <Imageloader imageID={item?.value.image?.id} classNames="h-[89px] object-cover w-full"/>
                    </div>
                    <div className="p-1 flex justify-between items-center basis-2/3 w-full h-full group">
                      <div className="flex flex-col w-full gap-1">
                        <p className="font-bold text-xs font-thin">
                          <span className="italic text-gray-500">Name: </span>{" "}
                          {item?.value?.name}
                        </p>
                        <p className="font-bold text-xs text-green-500">
                          <span className="italic text-gray-500 font-thin">
                            Price:{" "}
                          </span>{" "}
                          ${item?.value.price}
                        </p>
                        <p className="text-gray-700 text-xs font-bold"></p>
                        <p className="text-xs whitespace-nowrap">
                          {item?.value.description}
                        </p>
                        <div className="flex justify-between  item-center">
                          <button className="flex px-2 rounded-full text-xs bg-gray-100 text-gray-600 items-center font-bold">
                            {item?.value.category}
                          </button>
                        </div>
                        {/* <div className="opacity-0 group-hover:opacity-100">
                          <NumberOfExtras
                            pages={pages}
                            id={item.value.id}
                            setAuth={setAuth}
                            auth={auth}
                            resID={resID}
                          />
                        </div> */}
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
        </RestaurantDescription>
      </div>
    </>
  );
};

export default ViewRestaurantsPage;
