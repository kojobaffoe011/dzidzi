import  {  useState } from "react";
import { Modal } from "../modal";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Spinner from "../../loaders/Spinner";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import Button from "../../Button";
import {useGetOrderItemByID } from "../../brokers/apicalls";
import axios from "axios";

const UpdateOrderModal = (props) => {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const { order } = props;
  const { setAuth } = useAuth();
 
  const {
    data: orderItem,
    isLoading: orderItemLoading,
    isError: isOrderItemError,
    error: orderItemError,
  } = useGetOrderItemByID(order?.id);

  const {
    mutate: updateMutate,
    isLoading,
    data,
  } = useMutation({
    mutationKey: ["updateOrder", order?.id],
    mutationFn: async (data) => {
      const response = await axios.put(`/item/${order.id}`, data);
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
      console.log({ data });
      showErrorToast(error.message);
    },
  });

  const { mutate: deleteMutate, isLoading: deleteLoading } = useMutation({
    mutationKey: ["deleteOrderItem", order?.id],
    mutationFn: async (data) => {
      const response = await axios.delete(`/item/${order.id}`, data);
      return response?.data;
    },
    onSuccess: (data) => {
      setAuth((prevAuth) => ({
        ...prevAuth,
        orders: prevAuth?.orders?.filter((item) => item.id !== order.id),
      }));

      showSuccessToast("Order Item Deleted Successfully");
      props.handleCancel();
    },
    onError: (error) => {
      console.log({ data });
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
          menu: extra.menu.id,
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
    <div handleCancel={props.handleCancel} isOpen={props.isOpen}>
      <Modal {...props}>
        <>
          {orderItemLoading ? (
            <div className="p-5">
              <Spinner color="black" size="90px" />
            </div>
          ) : (
            <div className="p-2 grid grid-cols-2 mt-8">
              <div className=""></div>
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
                    >
                      {isLoading ? (
                        <Spinner color="WHITE" size="30px" />
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
                        className="font-bold text-md text-red-700 w-full"
                        onClick={handleDeleteOrder}
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
    </div>
  );
};

export default UpdateOrderModal;