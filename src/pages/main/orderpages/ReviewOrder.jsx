import  { useContext, useState } from "react";
import Button from "../../../components/Button";
import { useParams } from "react-router";
import {
  useExtrasList,
  useGetSingleMenu,
} from "../../../components/brokers/apicalls";
import Loader from "../../../components/loaders/Loader";
import Spinner from "../../../components/loaders/Spinner";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import axios from "axios";
import Imageloader from "../../../components/loaders/Imageloader";
import OrderContext from "../../../context/orderProvider";
import  PropTypes  from "prop-types";

const NumberOfExtras = ({ id, setAuth, auth, resID, setReplaceOrder, setOrderItems, menuData }) => {
  const [extraCount, setExtraCount] = useState(1);

  const { mutate, isPending } = useMutation({
    mutationKey: ["addExtras"],
    mutationFn: async (data) => {
      const response = await axios.post(`/item`, data);
      return response?.data;
    },
    onSuccess: (data) => {
      setAuth((prevAuth) => ({
        ...prevAuth,
        open: true,
        restaurant: { id: resID, name: menuData?.restaurant?.name },
        orders: Array.isArray(prevAuth?.orders)
          ? [...prevAuth.orders, data] // Append to the existing array if it's valid
          : [data], // Initialize with the new data if orders is not an array
      }));
      showSuccessToast("Extra Added Successfully");
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const handleAddExtra = () => {
    try {
      if (!auth?.restaurant || resID == auth?.restaurant.id) {
        mutate({
          extra: id,
          quantity: extraCount,
        });
      } else throw Error("DIFFERNTRESTAURANTS");
    } catch (error) {
      if(error.message == "DIFFERNTRESTAURANTS"){
         setAuth({ ...auth, restaurantClash: true });
        setReplaceOrder(true);
        setOrderItems({
          orderType: "extra",
          extra: id,
          quantity: extraCount,
          restaurant: menuData?.restaurant?.name
        })

        return;
      }
      showErrorToast(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="">
          <div className="flex gap-2 justify-between items-center">
            <div>
              <select
                name="quantity"
                id="plan"
                onChange={(e) => setExtraCount(e.currentTarget.value)}
              >
                {Array(99)
                  .fill("")
                  .map((item, idx) => {
                    return (
                      <option defaultValue={1} key={idx} value={idx + 1}>
                        {idx + 1}
                      </option>
                    );
                  })}
              </select>
            </div>
            <Button
              className="bg-black py-2 px-5 hover:bg-gray-600"
              rounded
              onClick={handleAddExtra}
            >
              {isPending ? (
                <Spinner color="WHITE" size="15px" />
              ) : (
                <p className="text-white font-bold text-xs">
                  Add {extraCount} to Order{" "}
                </p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const ReviewOrder = () => {
    const { setReplaceOrder, setOrderItems } = useContext(OrderContext); // Access setReplaceOrder from the context

  const [selectedNumber, setSelectedNumber] = useState(1);
  const { auth, setAuth } = useAuth();

  const [filters, setFilters] = useState({
    name: null,
    cursor: null,
    rating: null,
    minPrice: null,
    maxPrice: null,
    extraID: null,
  });

  const { resID, id } = useParams();
  const {
    isLoading: menuLoading,
    data: menuData,
    // isError,
    // error,
  } = useGetSingleMenu(id);

  const {
    data: extraList = [],
    isLoading: extraLoading,
    hasNextPage: extraHasNextPage,
    fetchNextPage: extraFetchNextPage,
    isFetchingNextPage: extraFetchingNextPage,
    // isError: isextraError,
  } = useExtrasList(
    filters.minPrice,
    filters.maxPrice,
    filters.name,
    filters.rating,
    resID,
    filters.extraID,
    filters.category
  );

  let pages = extraList?.pages?.flatMap((page) => page?.results);

  const { mutate, isPending: isLoading } = useMutation({
    mutationKey: ["addOrderItem"],
    mutationFn: async (data) => {
      const response = await axios.post(`/item`, data);
      return response?.data;
    },
    // mutationFn,
    onSuccess: (data) => {
      setAuth((prevAuth) => ({
        ...prevAuth,
        open: true,
        restaurant: { id: resID, name: menuData?.restaurant?.name },
        orders: Array.isArray(prevAuth?.orders)
          ? [...prevAuth.orders, data] // Append to the existing array if it's valid
          : [data], // Initialize with the new data if orders is not an array
      }));
      showSuccessToast("Order Item Added Successfully");
    },
    onError: (data) => {
      showErrorToast(data?.response?.error);
    },
  });

  const handleAddOrder = () => {
    try {
      if (!auth?.restaurant || resID == auth?.restaurant.id) {
        mutate({
          menu: id,
          quantity: selectedNumber,
        });
     } else throw Error("DIFFERNTRESTAURANTS");
    } catch (error) {
      if(error.message == "DIFFERNTRESTAURANTS"){
        setAuth({ ...auth, restaurantClash: true });
        setReplaceOrder(true);
        setOrderItems({
          orderType: "menu",
          menu: id,
          quantity: selectedNumber,
          restaurant: menuData?.restaurant?.name
        })

        return;
      }
      showErrorToast(error.message);
    }
  };

  if (menuLoading || extraLoading) {
    return <Loader />;
  }

  return (
    <div className="">
      <div className=" mx-auto w-full flex-col flex h-full relative">
        <div>
          <p>Back to {menuData?.restaurant?.name}</p>
        </div>
        <div className="grid grid-cols-2 p-2 gap-2">
          <div className="flex items-center justify-center h-full">
          <Imageloader imageID={menuData?.image?.id} classNames={'h-[500px] w-full border object-cover'}/>
          </div>
          <div className="flex-col flex">
            <div className="flex flex-col gap-1">
              <h1 className="font-extrabold text-3xl">{menuData?.name}</h1>
              <p className="font-bold text-gray-500 text-xl">
                € {menuData?.price}
              </p>
            </div>
            <div className="flex flex-col mt-8">
              <div>
                <select
                  name="quantity"
                  id="plan"
                  onChange={(e) => setSelectedNumber(e.currentTarget.value)}
                >
                  {Array(99)
                    .fill("")
                    .map((item, idx) => {
                      return (
                        <option defaultValue={1} key={idx} value={idx + 1}>
                          {idx + 1}
                        </option>
                      );
                    })}
                </select>
              </div>
              <Button
                className="bg-black py-3 mt-3 hover:bg-gray-600"
                rounded
                onClick={handleAddOrder}
              >
                {isLoading ? (
                  <Spinner color="WHITE" size="20px" />
                ) : (
                  <p className="text-white font-bold">
                    Add {selectedNumber} Order • €{" "}
                    {(selectedNumber * menuData?.price).toFixed(2)}
                  </p>
                )}
              </Button>
            </div>
            <div className="flex flex-col mt-8">
              <h1 className="font-extrabold text-xl">Description</h1>
              <p className="font-light text-gray-500 text-sm">
                {menuData?.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold">Pick Extras Here</p>
          <div className="grid grid-cols-3 gap-2">
            {pages?.map((item, idx) => {
              return (
                <div className="flex flex-col" key={idx}>
                  <div className="flex rounded overflow-hidden cursor-pointer border mb-2 items-center justify-between gap-3 p-1 border border-gray-500">
                    <div className="overflow-hidden basis-1/3 h-full">
                     <Imageloader imageID={item?.value.image?.id}/>
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
                        <div className="opacity-0 group-hover:opacity-100">
                          <NumberOfExtras
                            pages={pages}
                            id={item.value.id}
                            setAuth={setAuth}
                            auth={auth}
                            resID={resID}
                            setReplaceOrder={setReplaceOrder}
                            setOrderItems={setOrderItems}
                            menuData={menuData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {extraHasNextPage && (
            <div className="flex justify-center my-4">
              <button
                className="border border-gray-500 px-8 py-2 bg-gray-100 font-bold rounded hover:bg-gray-200"
                onClick={() => {
                  extraFetchNextPage();
                }}
              >
                {extraFetchingNextPage ? (
                  <Spinner color="blue" size="20px" />
                ) : (
                  <p className="text-xs">Load more</p>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

NumberOfExtras.propTypes = {
  id: PropTypes.string, 
  setAuth: PropTypes.func, 
  auth: PropTypes.object, 
  resID: PropTypes.string,
  setReplaceOrder: PropTypes.func, 
  setOrderItems: PropTypes.func, 
  menuData: PropTypes.object
} 

export default ReviewOrder;
