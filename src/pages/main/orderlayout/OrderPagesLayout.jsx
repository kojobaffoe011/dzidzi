import  { createContext, useState } from "react";
import Header from "../../../components/reusableComponents/Header";
import Footer from "../../../components/reusableComponents/Footer";
import { Outlet } from "react-router";

const OrderContext = createContext({});
const OrderpagesLayout = () => {
  const [order, SetOrder] = useState([]);
  return (
    <OrderContext.Provider value={{ order, SetOrder }}>
      <div className="relative">
        <Header />
        
        <div>
          <div className="mx-auto max-w-[1240px] flex-col">
            <div className="border border-red--500 ">a</div>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </OrderContext.Provider>
  );
};

export default OrderpagesLayout;
