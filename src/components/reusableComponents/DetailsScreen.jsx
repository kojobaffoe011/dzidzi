import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { GiPizzaSlice } from "react-icons/gi";
import RestaurantCard from "./restaurantCard";
import MenuDetails from "./menuDetails";

export const filters = [
  "Sort",
  "From Dzidzi",
  "Price",
  "Delivery Fee",
  "Dietary",
];
export const products = [
  {
    images: "  ",
    name: "Koo Eatery",
    rating: 4.7,
    deliveryfee: "$0.5",
    deliverytime: "25-40 min",
  },
  {
    images: "  ",
    name: "Koo Eatery",
    rating: 4.7,
    deliveryfee: "$0.5",
    deliverytime: "25-40 min",
  },
  {
    images: "  ",
    name: "Koo Eatery",
    rating: 4.7,
    deliveryfee: "$0.5",
    deliverytime: "25-40 min",
  },
  {
    images: "  ",
    name: "Koo Eatery",
    rating: 4.7,
    deliveryfee: "$0.5",
    deliverytime: "25-40 min",
  },
];

const promodata = [
  {
    images: "  ",
    title: "Welcome Bonus",
    subtitle: "Use Code DZIDZI()943047ASGFOIDB87",
    Terms: "LINK",
  },

  {
    images: "  ",
    title: "Welcome Bonus",
    subtitle: "Use Code DZIDZI()943047ASGFOIDB87",
    Terms: "LINK",
  },

  {
    images: "  ",
    title: "Welcome Bonus",
    subtitle: "Use Code DZIDZ1943GI04SGFOIDB87",
    Terms: "LINK",
  },
];

const categories = [
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
  {
    icon: <GiPizzaSlice size={"50px"} />,
    text: "pizza ",
  },
];

function Categories() {
  return (
    <div className="flex justify-center gap-8 p-8">
      {categories.map((item, idx) => {
        return (
          <div className="flex flex-col items-center">
            <div className=" p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer">
              {" "}
              {item.icon}
            </div>
            <p className="font-bold"> {item.text}</p>
          </div>
        );
      })}
    </div>
  );
}

function Promo() {
  return (
    <div className="grid grid-cols-3 p-16 gap-6">
      {promodata?.map((item, idx) => {
        return (
          <div className="">
            <div className="flex flex-col w-full gap-2">
              <div className="h-[230px] rounded-xl bg-promo-bg bg-cover bg-no-repeat relative">
                {" "}
                <div className="bg-black opacity-[0.75] flex justify-between h-full flex-col p-4 rounded-xl ">
                  {/* <div className=" flex justify-between h-full flex-col  "> */}
                  <div>
                    <p className="text-4xl text-white font-extrabold">
                      {item.title}
                    </p>
                    <p className="text-white">{item.subtitle}</p>
                  </div>
                  <div className="bg-black rounded-full">
                    <button className=" bg-white rounded-full p-2 px-2">
                      <div className="flex items-center justify-center  gap-2">
                        {" "}
                        <p className="text-xs"> Terms and Conditions </p>{" "}
                        <BsArrowRight />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DetailsMain() {
  return (
    <div className="flex flex-col gap-4">
      <Categories />
      <Promo />
      {/* <DetailsScreen /> */}
      <MenuDetails isRestaurantPage={true} filters={filters}>
        {" "}
        <RestaurantCard
          showDelivery={true}
          title="Popular Near Me"
          data={products}
        />
        <RestaurantCard
          showDelivery={true}
          title="New Entries"
          data={products}
        />
        <RestaurantCard
          showDelivery={true}
          title="First of many"
          data={products}
        />
      </MenuDetails>
    </div>
  );
}
export default DetailsMain;
