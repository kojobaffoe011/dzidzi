import  {  useState } from "react";
import { Modal } from "../modal";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Spinner from "../../loaders/Spinner";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
// import Button from "../../Button";
import {useGetOrderItemByID, useGetSingleMenu } from "../../brokers/apicalls";
import axios from "axios";
import Imageloader from "../../loaders/Imageloader";
import PropTypes from "prop-types";
import Button from "../../reusableComponents/Button";
import { delete_request, put } from "../../../utils/transport";

const UpdateOrderModal = (props) => {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const { order } = props;
  const { setAuth } = useAuth();

 
  const {
    data: orderItem,
    isLoading: orderItemLoading,
    // isError: isOrderItemError,
    // error: orderItemError,
  } = useGetOrderItemByID(order?.id);

  const {
    data: menuData,
    isLoading: menuDataLoading,
    isError:isMenuDataError,
    error: menuDataError,
  } = useGetSingleMenu(order?.menu?.id || order?.extra?.id);

  const {
    mutate: updateMutate,
    isPending,
    data,
  } = useMutation({
    mutationKey: ["updateOrder", order?.id],
    mutationFn: async (data) => {
      const response = await put(`/item/${order.id}`, data);
      return response?.data;
    },
    onSuccess: (data) => {
      setAuth((prevAuth) => ({
        ...prevAuth,
        open: true,
        orders: Array.isArray(prevAuth?.orders)
          ? prevAuth.orders.map(
              (order) =>
                order.id == data.id
                  ? { ...order, ...data } // Replace with edited info if the id matches
                  : order // Keep the order unchanged if the id doesn't match
            )
          : [data], // Initialize with the new data if orders is not an array
      }));

      showSuccessToast("Order Item Updated Successfully");
      props.handleCancel();
    },
    onError: (error) => {
      console.log({ error });
      showErrorToast(error.message);
    },
  });

  const { mutate: deleteMutate, isPending: deleteLoading } = useMutation({
    mutationKey: ["deleteOrderItem", order?.id],
    mutationFn: async (data) => {
      const response = await delete_request(`/item/${order.id}`, data);
      return response?.data;
    },
    onSuccess: () => {
      setAuth((prevAuth) => ({
        ...prevAuth,
        restaurantClash: prevAuth?.orders?.length <= 1 ? false : 0,
        restaurant: prevAuth?.orders?.length <= 1 ? null : prevAuth?.restaurant,
        orders: prevAuth?.orders?.filter((item) => item.id !== order.id)
      }));

      showSuccessToast("Order Item Deleted Successfully");
      props.handleCancel();
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const handleUpdateOrder = () => {
    try {
      if (order?.menu) {
        updateMutate({
          menu: order.menu.id,
          quantity: selectedNumber,
          id: order.id,
        });
      } else {
        updateMutate({
          menu: order.extra.id,
          quantity: selectedNumber,
          id: order.id,
        });
      }
    } catch (error) {
      showErrorToast(error.message);
      console.log({ error });
    }
  };

  const handleDeleteOrder = () => {
    try {
      if (order?.menu) {
        deleteMutate({
          id: order.id,
        });
      } else {
        deleteMutate({
          id: order.id,
        });
      }
    } catch (error) {
      showErrorToast(error.message);
      console.log({ error });
    }
  };


  return (
      <Modal {...props}>
        <>
          {orderItemLoading ? (
            <div className="p-5">
              <Spinner color="black" size="90px" />
            </div>
          ) : (
            <div className="p-2 grid grid-cols-2 mt-8 gap-2">
              <div className="
              ">
                <Imageloader imageID={menuData?.image?.id} classNames="h-[300px] w-full object-contain"/>
              </div>
              <div className="flex-col">
                <div className="flex-col flex">
                  <div className="flex flex-col gap-1">
                    <h1 className="font-extrabold text-3xl">
                      {orderItem?.menu
                        ? orderItem?.menu?.name
                        : orderItem?.extra?.name}
                    </h1>
                    <p className="font-bold text-gray-500 text-xl">
                      €
                      {orderItem?.menu
                        ? orderItem?.menu?.price
                        : orderItem?.extra?.price}
                    </p>
                  </div>
                  <div className="flex flex-col mt-8">
                    <div>
                      <select
                        name="quantity"
                        id="plan"
                        onChange={(e) =>
                          setSelectedNumber(e.currentTarget.value)
                        }
                      >
                        {Array(99)
                          .fill("")
                          .map((item, idx) => {
                            return (
                              <option
                                defaultValue={1}
                                key={idx}
                                value={idx + 1}
                              >
                                {idx + 1}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <Button
                      className="bg-black py-3 mt-3 hover:bg-gray-600"
                      rounded
                      onClick={handleUpdateOrder}
                      disabled={deleteLoading || isPending}
                    >
                      {isPending ? (
                        <Spinner color="WHITE" size="20px" />
                      ) : (
                        <p className="text-white font-bold">
                          Update Order • €
                          {(
                            selectedNumber *
                            (orderItem?.menu
                              ? orderItem?.menu?.price
                              : orderItem?.extra?.price)
                          ).toFixed(2)}
                        </p>
                      )}
                    </Button>
                    <div className="flex justify-center mt-2">
                      <Button
                        className="font-bold text-md text-red-700 w-full disabled:bg-white disabled:text-red-700"
                        onClick={handleDeleteOrder}
                        disabled={deleteLoading || isPending}
                      >
                        Remove from cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </Modal>
  );
};

export default UpdateOrderModal;

UpdateOrderModal.propTypes = {
  order: PropTypes.object,
  handleCancel: PropTypes.func,
  isOpen: PropTypes.bool
}
