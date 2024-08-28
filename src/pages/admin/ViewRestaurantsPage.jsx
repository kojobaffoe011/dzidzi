import { yupResolver } from "@hookform/resolvers/yup";
import React, { Suspense, useCallback } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as yup from "yup";
import {
  useAddCredentials,
  useGetSingleRestaurant,
  useMenuList,
  useDeleteRestaurant,
} from "../../components/brokers/apicalls";
import LazyImage from "../../components/LazyImage";
import Loader from "../../components/loaders/Loader";
import Spinner from "../../components/loaders/Spinner";
import RestaurantDescription from "../../components/reusableComponents/RestaurantDescription";
import burger from "../../assets/images/burger.jpeg";
import DeleteModal from "../../components/modal/restaurant/DeleteModal";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";

const ViewRestaurantsPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const types = ["RESTAURANT", "COURIER", "SERVICE", "ADMIN"];
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

  const credentialSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(credentialSchema),
  });

  const { mutationFn } = useDeleteRestaurant(id);

  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: (data) => {
      // if (data.response.status == 200) {
      showSuccessToast("Restaurant Deleted Successfully");
      navigateTo("/dashboard");
      reset();
    },
    onError: (data) => {
      showErrorToast(data?.response?.error);
      reset();
    },
  });

  const handleDelete = (data) => {
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
      />
      <div>
        <RestaurantDescription
          name={restaurantData?.name}
          rating={restaurantData?.averageRating}
          address={`${restaurantData?.address.street} ${restaurantData?.address.houseNumber}, ${restaurantData?.address.city}`}
          type={pathname.includes("detail") ? "" : "modal"}
          deleteFunction={handleOpenInvoiceModal}
          z
        >
          <div className="flex flex-col">
            <div>
              <p className="font-bold text-xl">Menus</p>
              <div className="grid grid-cols-3 gap-2">
                {pages?.map((item, idx) => {
                  return (
                    <Link
                      to={`/details/menu/revieworder/${item?.value.id}`}
                      key={idx}
                    >
                      <div className="flex rounded overflow-hidden cursor-pointer border mb-2 items-center justify-between gap-3 p-1 border border-gray-500">
                        <div className="overflow-hidden basis-1/3">
                          <Suspense
                            fallback={
                              <div>
                                <Spinner color="blue" size="20px" />
                              </div>
                            }
                          >
                            <LazyImage
                              src={
                                item?.value.image ? item?.value.image : burger
                              }
                              alt="imgs"
                              className="w-[100px] rounded h-[70px]"
                            />
                          </Suspense>
                        </div>
                        <div className="p-1 flex justify-between items-center basis-2/3 w-full h-full">
                          <div className="flex flex-col w-full gap-1">
                            <p className="font-bold text-xs font-thin">
                              <span className="italic text-gray-500">
                                Name:{" "}
                              </span>{" "}
                              {item?.value?.name}
                            </p>
                            <p className="font-bold text-xs text-green-500">
                              <span className="italic text-gray-500 font-thin">
                                Price:{" "}
                              </span>{" "}
                              ${item?.value.price}
                            </p>
                            <p className="text-gray-700 text-xs font-bold">
                              {/* {item?.room_type} */}
                            </p>
                            <p className="text-xs whitespace-nowrap">
                              {item?.value.description}
                            </p>
                            <div className="flex justify-between  item-center">
                              {/* <p className="text-gray-500 text-xs">{item?.block}</p> */}

                              <button className="flex px-2 rounded-full text-xs bg-gray-100 text-gray-600 items-center font-bold">
                                {item?.value.category}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
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
