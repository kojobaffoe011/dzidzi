import { createContext, useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "../components/reusableComponents/Footer";
import Header from "../components/reusableComponents/Header";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ReplaceOrder from "../components/modal/restaurant/ReplaceOrder";
import useAuth from "../hooks/useAuth";
// import CheckLocationStatus from "../components/reusableComponents/CheckLocationStatus";

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
  const {pathname} = useLocation()

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
      {/* <CheckLocationStatus> */}
        <ReplaceOrder
        isOpen={replaceOrder}
        handleCancel={handleCloseReplaceModal}
        orderItems={orderItems}
        width="500px"
      />
      <div className="relative min-h-screen flex flex-col">
      <Header/>
        <div/>
          <div className="mx-auto w-[1440px] flex gap-2 flex-col">
              <Link to={-1}><IoArrowBackCircleOutline size='35px' className={`cursor-pointer ${pathname == '/details' ? 'hidden': ''}`}/></Link>
              
            <Outlet />
          </div>
        <div className="left-0 right-0 bottom-0">
        <Footer />
        </div>
        </div>
  
      {/* </CheckLocationStatus> */}
    </OrderContext.Provider>
  );
};

export default OrderContext;
