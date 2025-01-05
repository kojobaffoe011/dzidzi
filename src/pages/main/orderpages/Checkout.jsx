import { useCallback } from "react";
import { useState } from "react";
import { BiSolidBolt } from "react-icons/bi";
import { BsCartX } from "react-icons/bs";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuBaggageClaim } from "react-icons/lu";
import { MdOutlineDeliveryDining, MdOutlineDiscount } from "react-icons/md";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import Button from "../../../components/reusableComponents/Button";
import AddNote from "../../../components/modal/restaurant/AddNote";
import EditCheckoutAddress from "../../../components/modal/restaurant/EditCheckoutAddress";
import PromoCode from "../../../components/modal/restaurant/PromoCode";
import UpdateOrderModal from "../../../components/modal/restaurant/UpdateOrder";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Spinner from "../../../components/loaders/Spinner";
import DzidziLoader from "../../../components/loaders/DzidziLoader";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import {
  useCreatePaymentIntent,
  useGetActiveUser,
  useGetActiveUserDetails,
  useMakeOrder,
} from "../../../components/brokers/apicalls";
import { post } from "../../../utils/transport";

const deliveryOptions = [
  {
    type: "Priority",
    icon: <BiSolidBolt className="text-green-600" />,
    text: "10-25 min • Delivered directly to you",
    price: "+€1.99",
  },
  {
    type: "Standard",
    icon: <MdOutlineDeliveryDining />,
    text: "15-30min",
  },
];

const Checkout = () => {
  const [deliveryType, setDeliveryType] = useState("Standard");
  const [couponNumber, setCouponNumber] = useState(null);
  const [orderNote, setOrderNote] = useState(null);
  const { auth, setAuth } = useAuth();
  const { id } = useParams();
  const { mutationFn } = useCreatePaymentIntent();
  const { mutationFn: makeOrderMut } = useMakeOrder();
  const navigate = useNavigate();

  const [showCartItems, setShowCartItems] = useState(false);
  const [updateOrderOpen, setUpdateOrderOpen] = useState(false);
  const [promoCodeOpen, setPromoCodeOpen] = useState(false);
  const [editAddressOpen, setEditAddressOpen] = useState(false);
  const [addNoteOpen, setAddNoteOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleOpenUpdateModal = useCallback(() => {
    setUpdateOrderOpen(true);
  }, []);
  const handleCloseUpdateModal = useCallback(() => {
    setUpdateOrderOpen(false);
  }, []);

  const handleOpenPromoCodeModal = useCallback(() => {
    setPromoCodeOpen(true);
  }, []);
  const handleClosePromoCodeModal = useCallback(() => {
    setPromoCodeOpen(false);
  }, []);
  const handleOpenEditAddressModal = useCallback(() => {
    setEditAddressOpen(true);
  }, []);
  const handleCloseEditAddressModal = useCallback(() => {
    setEditAddressOpen(false);
  }, []);
  const handleOpenAddNoteModal = useCallback(() => {
    setAddNoteOpen(true);
  }, []);
  const handleCloseAddNoteModal = useCallback(() => {
    setAddNoteOpen(false);
  }, []);

  const navigateTo = (url) => navigate(url);

  const { data: userDetails, isLoading: userDetailsLoading } =
    useGetActiveUser();
  const { data, isLoading } = useGetActiveUserDetails(
    userDetails?.currentUserId
  );

  const totalOrderSum = auth?.orders?.reduce((total, order) => {
    return (
      total +
      order.quantity * (order.menu ? order.menu.price : order.extra.price)
    );
  }, 0);

  const totalBreakdown = [
    {
      name: "Subtotal",
      amount: totalOrderSum,
    },
    {
      name: "Delivery Fee",
      amount: 3.98 + (deliveryType == "Priority" ? 1.99 : 0),
    },
    {
      name: "Service Fee",
      amount: 1.32,
    },
    {
      name: "Taxes",
      amount: 0.0,
    },
  ];

  const totalPayableAmount = totalBreakdown.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  const { mutate, isPending } = useMutation({
    mutationKey: ["checkOutOrderItem"],
    mutationFn: makeOrderMut,
    onSuccess: async (response) => {
      const { data } = response;

      setAuth((prevAuth) => ({
        ...prevAuth,
        open: false,
        orderDetails: data,
      }));
      const orderId = data?.id;

      await mutateAsync({ orderId });

      showSuccessToast("Order Successfully Created");
    },
    onError: (error) => {
      console.log(error);
      showErrorToast(error.message);
    },
  });

  const proceedToPayment = () => {
    let orderItemsPush = [];
    auth?.orders?.forEach((element) => orderItemsPush.push(element.id));
    const payload = {
      orderItems: orderItemsPush,
      useMyAddress: auth?.deliveryAddress ? auth?.useMyAddress : true,
      address: auth?.deliveryAddress?.street
        ? auth?.deliveryAddress
        : {
            city: data?.address?.city,
            houseNumber: data?.address?.houseNumber,
            street: data?.address?.street,
            zip: data?.address?.zip,
          },
    };
    try {
      mutate(
        couponNumber
          ? {
              ...payload,
              couponNumber: couponNumber,
              orderNote: orderNote,
            }
          : { ...payload, orderNote: orderNote }
      );
      return;
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const { mutateAsync, isPending: paymentIntentPending } = useMutation({
    mutationKey: ["createPaymentIntent"],
    mutationFn,
    onSuccess: (paymentResponse) => {
      // Handle success, navigate to success page
      console.log("Payment Intent Created:", paymentResponse);
    },
    onError: (error) => {
      if (error.message == "Request failed with status code 403") {
        navigateTo("/details/user-profile/orders");
      }
      console.error("Error proceeding with payment:", error);
    },
  });

  if (userDetailsLoading || isLoading) {
    return <DzidziLoader />;
  }

  if (userDetails?.currentUserRole != "USER") {
    //navigate to unauthorized route
    return <div>Unauthorized</div>;
  }

  if (!auth?.orders || auth?.orders?.length < 1) {
    return (
      <div className="flex w-full h-screen items-center justify-center ">
        <div className="flex flex-col border-black border-2 p-4 items-center gap-8 rounded-xl mb-72">
          <BsCartX size="100px" />
          <p className="font-bold text-2xl">
            Oops no items in your cart. Add Items to continue
          </p>
          <Button
            className={`mt-4 p-4 font-bold text-white rounded-lg cursor-pointer bg-black border border-black border-2 w-full`}
            onClick={() => navigateTo(`/details/menu/${id}`)}
          >
            Add Items to Cart
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UpdateOrderModal
        isOpen={updateOrderOpen}
        handleCancel={handleCloseUpdateModal}
        userRole={"RESTAURANT_ADMIN"}
        order={selectedOrder}
        width="1000px"
      />
      <EditCheckoutAddress
        isOpen={editAddressOpen}
        handleCancel={handleCloseEditAddressModal}
        userRole={"RESTAURANT_ADMIN"}
        order={selectedOrder}
        width="600px"
        address={data?.address}
      />
      <PromoCode
        isOpen={promoCodeOpen}
        handlecancel={handleClosePromoCodeModal}
        userRole={"RESTAURANT_ADMIN"}
        order={selectedOrder}
        width="350px"
        setcouponnumber={setCouponNumber}
      />
      <AddNote
        isOpen={addNoteOpen}
        handleCancel={handleCloseAddNoteModal}
        userRole={"RESTAURANT_ADMIN"}
        order={selectedOrder}
        width="350px"
        setordernote={setOrderNote}
      />
      <div className="grid grid-cols-3 mt-16 gap-16">
        <div className="col-span-2 flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Delivery Details</p>
            <div className="flex justify-between items-center gap-4">
              <p className="text-xs">Delivery</p>
              <p className="text-xs">Pickup</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-4 items-center">
              <LuBaggageClaim className="text-gray-600" size="20px" />
              {auth?.deliveryAddress?.street ? (
                <div className="flex flex-col">
                  <p className="text-md font-normal">
                    {`${auth?.deliveryAddress?.street},
                    ${auth?.deliveryAddress?.houseNumber}`}
                  </p>
                  <p className="text-sm font-normal text-gray-600">
                    {`${auth?.deliveryAddress?.zip || ""} 
                    ${auth?.deliveryAddress?.city}`}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="text-md font-normal">
                    {data
                      ? `${data.address?.street} ${data.address?.houseNumber}`
                      : auth?.deliveryAddress?.street}
                  </p>
                  <p className="text-sm font-normal text-gray-600">
                    {data
                      ? ` ${data.address?.city}`
                      : auth?.deliveryAddress?.city}
                  </p>
                </div>
              )}
            </div>

            <div
              className="flex justify-between items-center gap-4 px-2 py-1 rounded-xl hover:bg-gray-100"
              onClick={() => handleOpenEditAddressModal()}
            >
              <p className="text-sm font-normal cursor-pointer">Edit</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-4 items-center">
              <FiUser className="text-gray-600" size="20px" />
              <div className="flex flex-col">
                <p className="text-md font-normal">Note to delivery Person</p>
                <p className="text-sm font-normal text-gray-600">
                  {auth?.note || "Add a note for your delivery person"}
                </p>
              </div>
            </div>

            <div
              className="flex justify-between items-center gap-4 px-2 py-1 rounded-xl hover:bg-gray-100"
              onClick={() => handleOpenAddNoteModal()}
            >
              <p className="text-sm font-normal cursor-pointer">Edit</p>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Delivery Options</p>
            </div>
            {deliveryOptions.map((item, idx) => {
              return (
                <div
                  className={`flex justify-between items-center mt-4 p-4 rounded-lg cursor-pointer hover:bg-gray-200 ${
                    deliveryType == item.type
                      ? "border border-black border-2"
                      : ""
                  }`}
                  key={idx}
                  onClick={() => setDeliveryType(item.type)}
                >
                  <div className="flex gap-4 items-center">
                    {item.icon}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <p className="text-md font-normal">{item.type}</p>
                        {item.type == "Priority" && (
                          <div className="px-4 py-1 bg-green-600 text-white font-bold text-sm rounded-full">
                            <p>Faster</p>
                          </div>
                        )}
                      </div>

                      <p className="text-sm font-normal text-gray-600">
                        {item.text}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <p className="text-sm font-normal cursor-pointer">
                      {item.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex justify-between items-center ">
              <p className="text-xl font-bold">Payment</p>
            </div>
            <p className="text-sm my-4 font-light">
              All payments through Dzidzi are powered by{" "}
              <span className="font-bold">Stripe</span>. Click proceed to
              payment to be redirected to the payment screen to complete
              payment. Thanks for choosing Dzidzi
            </p>
            <Button
              onClick={proceedToPayment}
              className={`mt-4 p-4 font-bold text-white rounded-lg cursor-pointer bg-black border border-black border-2`}
            >
              {isPending || paymentIntentPending ? (
                <Spinner color="white" size="20px" />
              ) : (
                "Proceed to Payment"
              )}
            </Button>
            {/* );
            })} */}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 w-full justify-between">
            <div className="w-[50px] h-[50px] rounded-full bg-red-600" />
            {/* <Link to={`/menu/details/${id}`}> */}
            <div
              className="flex justify-between items-center flex-grow cursor-pointer"
              onClick={() => navigateTo(`/details/menu/${id}`)}
            >
              <div className="flex flex-col">
                <p className="text-md font-bold">{auth?.restaurant?.name}</p>
                <p className="text-sm font-normal text-gray-600">
                  47059 Duisburg
                </p>
              </div>
              <FaChevronRight className="text-gray-600" />
            </div>
            {/* </Link> */}
          </div>

          <Button
            className={`mt-4 p-4 font-bold text-white rounded-lg cursor-pointer bg-black border border-black border-2`}
            onClick={proceedToPayment}
          >
            {isPending ? (
              <Spinner color="white" size="20px" />
            ) : (
              "Proceed to Payment"
            )}
          </Button>
          <div className="flex flex-col gap-4">
            <div
              className="flex gap-4 w-full justify-between cursor-pointer mt-8"
              onClick={() => setShowCartItems(!showCartItems)}
            >
              <TfiShoppingCartFull className="text-gray-600" size="20px" />
              <div className="flex justify-between items-center flex-grow">
                <div className="flex flex-col">
                  <p className="text-md font-normal">
                    Cart Summary ({auth?.orders?.length} items)
                  </p>
                </div>
                <FaChevronDown className="text-gray-600" />
              </div>
            </div>
            {showCartItems &&
              auth?.orders?.map((item, idx) => {
                return (
                  <div
                    className="flex gap-4 w-full justify-between cursor-pointer"
                    key={idx}
                    onClick={() => {
                      handleOpenUpdateModal();
                      setSelectedOrder(item);
                    }}
                  >
                    <div className="w-[50px] h-[50px] rounded-full bg-red-600" />
                    <div className="flex justify-between items-center flex-grow">
                      <div className="flex flex-col">
                        <p className="text-md font-bold">
                          {item.menu ? item.menu.name : item.extra.name}
                        </p>
                        {/* <p className="text-xs font-normal text-gray-600">
                        47059 Duisburg
                      </p> */}
                        <p className="text-sm font-bold text-gray-600">
                          €
                          {item.menu
                            ? (item.menu.price * item.quantity).toFixed(2)
                            : (item.extra.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="font-bold">{item.quantity}</p>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="flex justify-between items-center ">
              <p className="text-xl font-bold">Promotion</p>
            </div>
            <div
              className="flex gap-4 w-full justify-between cursor-pointer "
              onClick={() => handleOpenPromoCodeModal()}
            >
              <MdOutlineDiscount className="text-gray-600" size="20px" />
              <div className="flex justify-between items-center flex-grow">
                <div className="flex flex-col">
                  <p className="text-md font-normal">Add Promo Code</p>
                </div>
                <FaChevronRight className="text-gray-600" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-8">
            {auth?.orders && (
              <>
                <div className="flex justify-between items-center ">
                  <p className="text-xl font-bold">Order total</p>
                </div>
                {/* {auth?.orders && ( */}
                <div className="flex flex-col gap-2 justify-center ">
                  {totalBreakdown.map((item, idx) => {
                    return (
                      <div
                        className="flex justify-between items-center flex-grow"
                        key={idx}
                      >
                        <div className="flex flex-col">
                          <p className="text-md font-light ">{item.name}</p>
                        </div>
                        <p className="text-gray-500 font-light">
                          €{item.amount?.toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>
                {/* )} */}
                <div className="flex justify-between items-center flex-grow mt-4">
                  <div className="flex flex-col">
                    <p className="text-2xl font-extrabold ">Total</p>
                  </div>
                  <p className="text-2xl font-extrabold">
                    €{totalPayableAmount.toFixed(2)}
                  </p>
                </div>
              </>
            )}
            <div>
              <p className="text-xs font-light text-gray-400 indent-px leading-6">
                Terms: All prices incl. VAT. For your order the{" "}
                <span className="font-semibold">
                  Dzidzi additional conditions apply{" "}
                </span>
                <br />
                Information about the processing of your data is available in
                our <span className="font-semibold">privacy notice</span> <br />
                If you’re not around when the delivery person arrives, they’ll
                leave your order at the door. By placing your order, you agree
                to take full responsibility for it once it’s delivered. Orders
                containing alcohol or other restricted items may not be eligible
                for leave at door and will be returned to the store if you are
                not available. You are entitled to the statutory rights of
                cancellation. You can find more information about these or their
                exclusion in the Dzidzi Additional Terms and the offers of the
                partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
