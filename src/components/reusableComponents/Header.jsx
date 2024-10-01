import React, { Suspense, useCallback } from "react";
import { FiFacebook } from "react-icons/fi";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { LuGithub } from "react-icons/lu";
import { LiaMapSolid } from "react-icons/lia";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { GiHamburger } from "react-icons/gi";
import { useLogout } from "../brokers/apicalls";
import cookie from "../../utils/cookie";
import { showErrorToast, showSuccessToast } from "../../toast/Toast";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../loaders/Spinner";
import Cart from "./Cart";
import { TfiMoreAlt } from "react-icons/tfi";
import useAuth from "../../hooks/useAuth";
import Button from "../Button";
import burger from "../../assets/images/burger.jpeg";
import LazyImage from "../LazyImage";
import { useState } from "react";
import UpdateOrderModal from "../modal/restaurant/UpdateOrder";
import LoginModal from "../modal/restaurant/LoginModal";

const Orders = ({ auth, setAuth, navigateTo, token }) => {
  const [updateOrderOpen, setUpdateOrderOpen] = useState(false);
  const [loginModalOpen, setloginModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleOpenUpdateModal = useCallback(() => {
    setUpdateOrderOpen(true);
  }, []);
  const handleCloseUpdateModal = useCallback(() => {
    setUpdateOrderOpen(false);
  }, []);
  const handleOpenLoginModal = useCallback(() => {
    setloginModalOpen(true);
  }, []);
  const handleCloseLoginModal = useCallback(() => {
    setloginModalOpen(false);
  }, []);
  const totalSum = auth?.orders?.reduce((total, order) => {
    return (
      total +
      order.quantity * (order.menu ? order.menu.price : order.extra.price)
    );
  }, 0);

  return (
    <>
      <UpdateOrderModal
        isOpen={updateOrderOpen}
        handleCancel={handleCloseUpdateModal}
        userRole={"RESTAURANT"}
        order={selectedOrder}
        width="1000px"
      />
      <LoginModal
        isOpen={loginModalOpen}
        handleCancel={handleCloseLoginModal}
        width="700px"
      />

      <div className="p-4 flex flex-col shadow-md absolute right-0 h-screen w-[450px] z-[15] bg-white shadow-lg top-[-16px] bottom-0">
        <div className="mt-4">
          <button
            onClick={() => {
              setAuth({ ...auth, open: false });
            }}
          >
            <RiCloseLine size={"30px"} className="cursor-pointer" />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-3xl whitespace-nowrap font-extrabold">
              {auth?.restaurant?.name}
            </p>
            <TfiMoreAlt size="15px" />
          </div>
          <div className="flex justify-between items-center">
            <p>{auth?.orders && auth.orders.length} item(s)</p>
            <p className="font-bold">
              <span className="font-extralight">Subtotal:</span> €
              {totalSum?.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-3 mt-8 h-[600px] overflow-scroll">
            {auth?.orders?.map((item, idx) => {
              return (
                <div
                  className="flex-col flex mb-6 cursor-pointer"
                  key={idx}
                  onClick={() => {
                    handleOpenUpdateModal();
                    setSelectedOrder(item);
                  }}
                >
                  <div className="flex justify-between">
                    <p className="font-bold">
                      {item.menu ? item.menu.name : item.extra.name}
                    </p>
                    <div className="flex justify-center items-center">
                      <Suspense
                        fallback={
                          <div>
                            <Spinner color="blue" size="20px" />
                          </div>
                        }
                      >
                        <LazyImage
                          src={item?.value?.image ? item?.value?.image : burger}
                          alt="imgs"
                          className="w-[100px] rounded h-[70px] bg-center"
                        />
                      </Suspense>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-light">
                      Quantity:{" "}
                      <span className="font-bold">{item.quantity}</span>
                    </p>

                    <p className="font-bold">
                      €
                      {item.menu
                        ? (item.menu.price * item.quantity).toFixed(2)
                        : (item.extra.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xl font-bold">
            <p className="">Subtotal</p>
            <p className="">€{totalSum?.toFixed(2)}</p>
          </div>
          <div className="flex flex-col gap-3">
            {/* <Link to={`/details/menu/${auth?.restaurant.id}`}> */}
            <Button
              className="bg-black py-3 mt-3 hover:bg-gray-600"
              rounded
              onClick={() => {
                if (token) {
                  navigateTo(`/details/checkout/${auth?.restaurant?.id}`);
                  return setAuth({ ...auth, open: false });
                } else {
                  setAuth({ ...auth, open: false });
                  return navigateTo(`/login`);
                }
              }}
            >
              <p className="text-white font-bold">Go to checkout</p>
            </Button>
            {/* </Link>{" "} */}
            <div className="flex justify-center items-center">
              <p className="font-bold">Add Items</p>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

const Header = () => {
  const { auth, setAuth } = useAuth();
  const { pathname } = useLocation();
  const { mutationFn } = useLogout();
  const loggedIn = cookie.getCipher();
  const navigate = useNavigate();
  const navigateTo = (url) => navigate(url);

  const { mutate, isLoading: cardLoading } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      setAuth({});

      showSuccessToast("Logged in Successfully");
      navigateTo("/");
    },
    onError: (data) => {
      showErrorToast(data.response.data?.message || "An error occured");
    },
  });

  const onClick = () => {
    return setAuth({ ...auth, open: true });
  };

  const handleLogout = () => {
    cookie.clearCipher();
    localStorage.removeItem("dzidzi");
    localStorage.removeItem("loginTime");
    return mutate();
  };

  return (
    <div className={`px-24 ${auth?.open ? "mt-4" : "mt-4"} relative`}>
      {auth?.open && auth?.orders?.length > 0 && (
        <Orders
          auth={auth}
          setAuth={setAuth}
          navigateTo={navigateTo}
          token={loggedIn}
        />
      )}
      <div className="flex justify-between items-center">
        <Link to={pathname == "/details" ? "" : -1}>
          <div className="flex items-center gap-4">
            <GiHamburger className="cursor-pointer" size="25px" />
            <p className="font-logo font-extrabold text-3xl">dzidzi</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {" "}
          <button onClick={onClick} className="transparent">
            <Cart numberOfOrders={auth?.orders ? auth.orders.length : 0} />
          </button>
          {loggedIn && (
            <Link to="/">
              <button
                className="rounded-full bg-white px-6 py-2 border border-gray-900"
                onClick={handleLogout}
              >
                <div className="flex items-center justify-center">
                  {cardLoading ? (
                    <Spinner />
                  ) : (
                    <p className="font-bold font-gray-500 text-xs ">Logout</p>
                  )}
                </div>
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="border border-gray-300 my-2" />
    </div>
  );
};

export default Header;
