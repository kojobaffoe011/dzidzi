import { createContext, useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/reusableComponents/Footer";
import Header from "../components/reusableComponents/Header";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ReplaceOrder from "../components/modal/restaurant/ReplaceOrder";
import useAuth from "../hooks/useAuth";

// Create an empty context to manage order-related data
const OrderContext = createContext({});

/**
 * The `OrderProvider` component serves as a context provider for managing order-related data.
 * It uses React's `useState` hook to maintain the order state.
 *
 * @param {Object} props - React props, typically containing child components.
 * @param {JSX.Element} props.children - An array of breadcrumb objects, each having a `text` function.
 * @returns {JSX.Element} A context provider that wraps its child components.
 */


export const OrderProvider = () => {
  // Initialize the authentication state with an empty object
  const [replaceOrder, setReplaceOrder] = useState(false);
  const [orderItems, setOrderItems] = useState({})
  const {auth, setAuth} = useAuth()
  const location = useLocation()

  const handleOpenReplaceModal = useCallback(() => {
    setReplaceOrder(true);
  }, []);
  const handleCloseReplaceModal = useCallback(() => {
    setReplaceOrder(false);
    setAuth({...auth, restaurantClash: false})
  }, [auth, setAuth]);


  // Use useEffect to check for restaurantClash and open the modal when it exists
  useEffect(() => {
    if (auth?.restaurantClash) {
      handleOpenReplaceModal();
    }
  }, [auth?.restaurantClash, handleOpenReplaceModal]);




  return (
    // Provide the authentication context with auth, setAuth values
    <OrderContext.Provider value={{ setReplaceOrder, setOrderItems }}>
        <ReplaceOrder
        isOpen={replaceOrder}
        handleCancel={handleCloseReplaceModal}
        orderItems={orderItems}
        width="500px"
      />
      <div className="relative h-screen">

        <Header />
          <div className="mx-auto max-w-[1240px] flex gap-2 flex-col">
              <Link to={location.state?.from?.pathname.includes("auth") ? "" : -1}><IoArrowBackCircleOutline size='35px' className="cursor-pointer" /></Link>
              
            <Outlet />
          </div>
        </div>
        <Footer />
    </OrderContext.Provider>
  );
};

export default OrderContext;
