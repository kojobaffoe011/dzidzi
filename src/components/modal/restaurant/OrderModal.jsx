import OrderStatus from "../../reusableComponents/orderStatus";
import SideModal from "../../reusableComponents/SideModal";
import ErrorOccured from "../../notices/ErrorOccured";
import { humanDatetime } from "../../../utils/config";
import {
  useGetOrderItemsByOrderID,
  useGetSingleOrder,
  useUpdateOrderStaus,
} from "../../brokers/apicalls";
import Spinner from "../../loaders/Spinner";
import PropTypes from "prop-types";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Select from "react-select";
import Button from "../../reusableComponents/Button";
import { useOutletContext } from "react-router";

const options = [
  { value: "PENDING", label: "PENDING", color: "#713f12", courier: false },
  { value: "ACCEPTED", label: "ACCEPTED", color: " green", courier: false },
  {
    value: "AWAITING_PICKUP",
    label: "AWAITING PICKUP",
    color: " blue",
    courier: false,
  },
  {
    value: "READY_FOR_DELIVERY",
    label: "READY FOR DELIVERY",
    color: " gray",
    courier: true,
  },
  { value: "DELIVERED", label: "DELIVERED", color: " purple", courier: true },
  { value: "CANCELLED", label: "CANCELLED", color: " red", courier: false },
];

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colorStyles = {
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const ChangeOrderStatus = ({ orderStatus, orderID, setOpen, activeUser }) => {
  const [selectedOption, setSelectedOption] = useState(null || orderStatus);

  const { mutationFn } = useUpdateOrderStaus(orderID, selectedOption);

  const userRole = activeUser?.currentUserRole;

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateOrder", orderID, selectedOption],
    mutationFn,
    onSuccess: () => {
      showSuccessToast("Order updated successfully");
      // props.handleCancel();
      setOpen(false);
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });

  const updateOrder = () => {
    return mutate({});
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="col-span-2">
        <Select
          defaultValue={options.find((item) => item.value == orderStatus)}
          options={
            userRole == "COURIER"
              ? options.filter((option) => option.courier)
              : options
          }
          onChange={(item) => setSelectedOption(item.value)}
          styles={colorStyles}
        />
      </div>

      <Button
        onClick={updateOrder}
        variant="success"
        className="h-[40px]"
        rounded
      >
        {isPending ? (
          <Spinner color="white" size="20px" />
        ) : (
          <p>Update status</p>
        )}
      </Button>
    </div>
  );
};

const OrderModal = ({ orderID, top, right, open, setOpen }) => {
  const [, activeUser] = useOutletContext();

  const { data, isLoading } = useGetSingleOrder(orderID);
  const {
    data: orderItems,
    isLoading: orderItemsLoading,
    isError,
  } = useGetOrderItemsByOrderID(orderID);

  const orderNumber = data?.orderNumber;
  const orderStatus = data?.status;

  const customer = data
    ? [
        {
          text: "Ordered on",
          value: humanDatetime(data.orderDate),
        },
        {
          text: "Customer name",
          value: `${data.user.firstName} ${data.user.lastName}`,
        },
        {
          text: "Phone",
          value: data.user.contact,
        },
        {
          text: "Delivery to",
          value: `${data.address.street} ${data.address.houseNumber}, ${data.address.city}`,
        },
      ]
    : null;

  const payment = data
    ? [
        {
          text: "VAT",
          value: data.vat,
        },
        {
          text: "Discount",
          value: data.discount,
        },
        {
          text: "Delivery Fee",
          value: data.deliveryFee,
        },
        {
          text: "Order Price",
          value: data.totalOrderPrice,
        },
        {
          text: "Total Amount",
          value: data.totalAmountToPay,
        },
      ]
    : null;

  if (isError) {
    <div>
      <ErrorOccured />
    </div>;
  }

  return (
    <SideModal
      top={top || "top-[-110px]"}
      bottom={""}
      right={right || "right-[-190px]"}
      left={""}
      title={orderNumber}
      subtext={"Order details"}
      open={open}
      setOpen={setOpen}
    >
      {isLoading || orderItemsLoading ? (
        <div className="flex flex-col h-full items-center justify-center gap-2">
          <Spinner color="blue" />
          <p className="text-xs">We need a sec to load your order details</p>
        </div>
      ) : (
        <div className="flex flex-col mt-2 relative">
          <div className="flex-col flex border-b gap-4">
            <p className="text-sm text-gray-600 font-bold">Items (€)</p>
            <div className="flex flex-col gap-2">
              {orderItems &&
                orderItems.map((item, idx) => {
                  return (
                    <div key={idx} className="grid-cols-3 grid mb-2">
                      <div className="flex flex-col ">
                        <p className="font-bold text-sm">
                          {item.extra ? item.extra.name : item.menu.name}
                        </p>
                        <p className="font-light text-xs">
                          {item.extra ? "extra" : "menu"}
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-light text-sm text-gray-500">
                          {item.quantity}pcs
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-normal text-sm">
                          {(item.extra
                            ? item.extra.price * item.quantity
                            : item.menu.price * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex-col flex border-b gap-4 mt-4">
            <div className="flex flex-col gap-2 mb-2">
              {customer &&
                customer.map((item, idx) => {
                  return (
                    <div key={idx} className="flex gap-2">
                      <div className="grid grid-cols-2 w-full">
                        <div>
                          <p className="text-gray-500 text-sm ">{item.text}</p>
                        </div>
                        <div className="flex items-center">
                          <p className="font-light text-xs">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex-col flex border-b gap-4 mt-4">
            <p className="text-sm text-gray-600 font-bold">Status</p>
            <div className="flex flex-col gap-2 mb-6">
              <OrderStatus orderStatus={orderStatus} />
              <p className="text-sm font-light mt-2">
                This order has a{" "}
                <span className="lowercase">{orderStatus} </span>status
              </p>
            </div>
          </div>
          <div className="flex-col flex border-b gap-4 mt-4">
            <p className="text-sm text-gray-600 font-bold">Payment (€)</p>
            <div className="flex flex-col gap-2 mb-2">
              {payment &&
                payment.map((item, idx) => {
                  return (
                    <div key={idx} className="flex gap-2">
                      <div className="grid grid-cols-2 w-full align-center">
                        <div>
                          <p className="text-gray-500 text-sm ">{item.text}</p>
                        </div>
                        <div className="flex items-center">
                          <p
                            className={`  ${
                              idx == payment.length - 1
                                ? "font-bold text-md"
                                : "font-light text-sm"
                            }`}
                          >
                            {item.value.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {(activeUser?.currentUserRole == "RESTAURANT_ADMIN" ||
            activeUser?.currentUserRole == "COURIER") && (
            <div className="flex-col flex gap-4 mt-4">
              <p className="text-sm text-gray-600 font-bold">Update Order</p>
              <ChangeOrderStatus
                orderStatus={data?.status}
                orderID={orderID}
                setOpen={setOpen}
                activeUser={activeUser}
              />
            </div>
          )}
        </div>
      )}
    </SideModal>
  );
};
export default OrderModal;

OrderModal.propTypes = {
  orderID: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

ChangeOrderStatus.propTypes = {
  orderStatus: PropTypes.string,
  orderID: PropTypes.string,
  setOpen: PropTypes.func,
  activeUser: PropTypes.object,
};
