import { createContext, useState } from "react";
import { Outlet } from "react-router";
import Footer from "../components/reusableComponents/Footer";
import Header from "../components/reusableComponents/Header";

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

const Orders = ({ order }) => {
  return (
    <div className="p-4 border border-red-500 flex flex-col shadow-md absolute right-0"></div>
  );
};

export const OrderProvider = () => {
  // Initialize the authentication state with an empty object
  const [order, setOrder] = useState([]);

  return (
    // Provide the authentication context with auth, setAuth values
    <OrderContext.Provider value={{ order, setOrder }}>
      <div className="relative">
        <Header />
        <div>
          {order.length > 0 && (
            <div className="absolute right-0">
              <Orders orders={order} />
            </div>
          )}
          <div className="mx-auto max-w-[1240px]">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </OrderContext.Provider>
  );
};

export default OrderContext;
