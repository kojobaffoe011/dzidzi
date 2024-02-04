import React from "react";
import { Outlet } from "react-router";
import Footer from "../../components/reusableComponents/Footer";
import Header from "../../components/reusableComponents/Header";

const OrderPagesLayout = () => {
  return (
    <div className="flex flex-col px-16 py-8">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default OrderPagesLayout;
