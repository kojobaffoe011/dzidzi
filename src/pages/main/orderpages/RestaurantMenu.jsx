import React from "react";

import { FaMedal } from "react-icons/fa6";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight, BsThreeDots } from "react-icons/bs";
import RestaurantDescription from "../../../components/reusableComponents/RestaurantDescription";
import ViewRestaurantsPage from "../../admin/ViewRestaurantsPage";

const MostLikedItems = () => {
  const numberOfImages = 10;
  const width = numberOfImages * 250;
  const maxWidth = `${"w-" + "[" + width + "px" + "]"}`;
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className="font-bold text-lg">Featured Items</p>
        <div className="flex justify-between items-center gap-4">
          <BsArrowLeft className="text-xl cursor-pointer" />
          <BsArrowRight className="text-xl cursor-pointer" />
        </div>
      </div>
      <div className="overflow-hidden overflow-x-scroll">
        <div
          className={`flex gap-2 overflow-x-scroll ${maxWidth} overflow-scroll cursor-pointer`}
        >
          {Array(numberOfImages)
            .fill("")
            .map((item, idx) => {
              return (
                <div
                  className="h-[250px] w-[250px] bg-green-300"
                  key={idx}
                ></div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const filters = ["Promotion", "Bucket", "Favorites", "Rice"];

const MenuList = () => {
  return (
    <div className="border border-red-400 mt-6 grid grid-cols-2 gap-4">
      {Array(5)
        .fill({
          name: "Chili Cheese Zinger Burger",
          price: "€8.49",
          text: "Spicy & cheesy - eine himmlische Kombination aus Chili Cheese uns unserem Zinger. Knusprig-scharfes Chicken mit Chili Cheese Sauce, knackigem Salat, Jalapenos und einer Scheibe Cheese, serviert in einem Brioche Bun.",
        })
        .map((item, idx) => {
          return <div className="border border-blue-200">a</div>;
        })}
    </div>
  );
};

function RestaurantMenu() {
  return (
    <div>
      <ViewRestaurantsPage />
    </div>
  );
}

export default RestaurantMenu;
