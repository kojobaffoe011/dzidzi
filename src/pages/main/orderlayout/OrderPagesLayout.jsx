import React from "react";
import Header from "../../../components/reusableComponents/Header";
import Footer from "../../../components/reusableComponents/Footer";
import { Outlet } from "react-router";

const OrderpagesLayout = () => {
  return (
    <div>
      <Header />
      <div className="mx-auto max-w-[1240px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default OrderpagesLayout;
