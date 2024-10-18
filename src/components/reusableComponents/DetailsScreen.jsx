import { useState } from "react";
import {  BsArrowRight } from "react-icons/bs";
import { GiPizzaSlice } from "react-icons/gi";
import RestaurantCard from "./restaurantCard";
import MenuDetails from "./menuDetails";
import { useRestaurantList } from "../brokers/apicalls";
import DzidziLoader from "../loaders/DzidziLoader";
import Spinner from "../loaders/Spinner";

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

function Categories() {
  return (
    <div className="flex justify-center gap-8 overflow-x-scroll px-12">
      {Array(8).fill({
    icon: <GiPizzaSlice size={"40px"} />,
    text: "pizza ",
  }).map((item, idx) => {
        return (
          <div className="flex flex-col items-center" key={idx}>
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
    <div className="grid grid-cols-3 py-4 gap-6">
      {promodata?.map((item, idx) => {
        return (
          <div className="cursor-pointer" key={idx}>
            <div className="flex flex-col w-full gap-2">
              <div className="h-[160px] rounded-xl bg-promo-bg bg-cover bg-no-repeat relative">
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
  const [name, setName] = useState(null);
  const [rating, setRating] = useState(null);
  const {
    data: restaurantsList = [],
    isLoading: restaurantsLoading,
    hasNextPage: restaurantsHasNextPage,
    fetchNextPage: restaurantsFetchNextPage,
    isFetchingNextPage: restaurantsFetchingNextPage,
    // isError: isUsersError,
  } = useRestaurantList(name, rating);

  let pages = restaurantsList?.pages?.flatMap((page) => page?.results);

  if (restaurantsLoading) {
   return <DzidziLoader/>
  }

  return (
    <div className="flex flex-col gap-4">
      <Categories />
      <Promo />
      <MenuDetails isRestaurantPage={true} filters={filters}>
        {" "}
        <RestaurantCard
          showDelivery={true}
          title="Popular Near Me"
          data={pages}
        />
        {restaurantsHasNextPage && (
          <div className="flex justify-center my-4">
            <button
              className="border border-gray-500 px-8 py-2 bg-gray-100 font-bold rounded hover:bg-gray-200"
              onClick={() => {
                restaurantsFetchNextPage();
              }}
            >
              {restaurantsFetchingNextPage ? (
                <Spinner color="blue" size="20px" />
              ) : (
                <p className="text-xs">Load more</p>
              )}
            </button>
          </div>
        )}
      </MenuDetails>
    </div>
  );
}
export default DetailsMain;
