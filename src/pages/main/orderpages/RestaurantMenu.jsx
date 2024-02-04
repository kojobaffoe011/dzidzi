import React from "react";
import {
  filters,
  products,
} from "../../../components/reusableComponents/DetailsScreen";

import { FaMedal } from "react-icons/fa6";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import RestaurantCard from "../../../components/reusableComponents/restaurantCard";
import MenuDetails from "../../../components/reusableComponents/menuDetails";

function RestaurantImage() {
  return (
    <div className="bg-hero-bg bg-cover h-[20vh] relative">
      <div className="absolute flex gap-2 right-8 top-8">
        {" "}
        <button className="p-3 bg-white rounded-full">
          {" "}
          <AiOutlineHeart size={"40px"} />{" "}
        </button>
        <button className="p-3 bg-white rounded-full">
          {" "}
          <BsThreeDots size={"40px"} />{" "}
        </button>
      </div>
    </div>
  );
}

function RestaurantIntro() {
  return (
    <div className="flex flex-col  gap-2 p-4">
      {" "}
      <div>
        {" "}
        <p className="text-4xl font-extrabold"> Koo Eatery</p>
      </div>
      <div className=" flex items-center  ">
        <div>
          {" "}
          <FaMedal className="mr-2" size={"30px"} />{" "}
        </div>
        <div className="flex flex-col  ">
          {" "}
          <div className="flex items-center">
            {" "}
            <AiFillStar className="mr-1" />
            <p>4.9 (Ratings(y)) • Category • $ • more info</p>
          </div>
          <div>
            {" "}
            <p className="text-xs text-slate-500">Open till 9:00 PM</p>{" "}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

function RestaurantMenu() {
  return (
    <div>
      <RestaurantImage />
      <RestaurantIntro />
      <MenuDetails filters={filters}>
        {" "}
        <RestaurantCard title="Popular Near Me" data={products} />
        <RestaurantCard title="New Entries" data={products} />
        <RestaurantCard title="First of many" data={products} />
      </MenuDetails>
    </div>
  );
}

export default RestaurantMenu;
