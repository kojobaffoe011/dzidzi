import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import { GiHamburger } from "react-icons/gi";
import cookie from "../../utils/cookie";
import Cart from "./Cart";
import useAuth from "../../hooks/useAuth";
import Button from "../Button";
import { useState } from "react";
import UpdateOrderModal from "../modal/restaurant/UpdateOrder";
import { useLogoutUser } from "../../hooks/useLogoutUser";
import { HiUser } from "react-icons/hi";
import PropTypes from "prop-types";
import SideModal from "./SideModal";
import Imageloader from "../loaders/Imageloader";

const Orders = ({ auth, setAuth, navigateTo, token }) => {
  const [updateOrderOpen, setUpdateOrderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleOpenUpdateModal = useCallback(() => {
    setUpdateOrderOpen(true);
  }, []);
  const handleCloseUpdateModal = useCallback(() => {
    setUpdateOrderOpen(false);
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
        userRole={"RESTAURANT_ADMIN"}
        order={selectedOrder}
        width="1000px"
      />
  
    <SideModal>

        <div className="flex flex-col gap-2">
          <div className="flex justify-end items-center">
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
                   <Imageloader imageID={item?.image?.id} classNames="h-[50px] w-full object-contain"/>

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
                  return navigateTo(`/auth`);
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
      </SideModal>
    
    </>
  );
};

const Profile = () => {
  return <div className="rounded-full px-2 py-2 border bg-gray-100 uppercase font-extrabold text-xl">
    <Link to='/details/user-profile'>
      <HiUser  className="text-slate-400 cursor-pointer" size={'25px'}/>
    </Link> 
    </div>
}

const Header = () => {
  const { auth, setAuth } = useAuth();
  const { pathname } = useLocation();
  const { mutate, isPending } = useLogoutUser();
  const loggedIn = cookie.getCipher();
  const navigate = useNavigate();
  const navigateTo = (url) => navigate(url);



  const onClick = () => {
    return setAuth({ ...auth, open: true });
  };

  const handleLogout = () => {
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
        <Link to={pathname == "/details" ? "" : "/details"}>
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
            <div className="flex gap-2">
              <Profile/>
                 <button
                className="rounded-full bg-white px-6 py-2 border border-gray-900"
                onClick={handleLogout}
                disabled={isPending}
              >
                <div className="flex items-center justify-center">
                  {/* {isPending ? (
                    <Spinner />
                  ) : ( */}
                    <p className="font-bold font-gray-500 text-xs ">Logout</p>
                  {/* )} */}
                </div>
              </button>
            </div>
           
          )}
          {!loggedIn && 
          <div className="flex gap-2">
              <Link to='/auth/register'>
              <button
                className="rounded-full bg-white px-6 py-2 border border-gray-900"
              >
                <div className="flex items-center justify-center">
               
                    <p className="font-bold font-gray-500 text-xs ">Register</p>
                </div>
              </button>
            </Link>  
              <Link to='/auth'>
              <button
                className="rounded-full bg-black px-6 py-2 border border-gray-900"
              >
                <div className="flex items-center justify-center">
               
                    <p className="font-bold text-white text-xs ">Login</p>
                </div>
              </button>
            </Link>  
          </div>  
         
          }
        </div>
      </div>
      <div className="border border-gray-300 my-2" />
    </div>
  );
};

export default Header;


Orders.propTypes = {
  auth: PropTypes.object,
  setAuth: PropTypes.func, 
  navigateTo: PropTypes.func, 
  token: PropTypes.string
}
