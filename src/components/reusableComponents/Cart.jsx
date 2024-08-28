import React from "react";
import { GiShoppingCart } from "react-icons/gi";

const Cart = (props) => {
  const { numberOfOrders } = props;
  return (
    <div className="relative cursor-pointer">
      <div className="absolute top-0 right-0 bg-red-600 rounded-full text-xs font-bold px-[4px] py-[1px] text-white ">
        {" "}
        {numberOfOrders || 0}
      </div>
      <GiShoppingCart size="40px" />
    </div>
  );
};

export default Cart;
