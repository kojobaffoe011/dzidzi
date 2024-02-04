import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

function RestaurantCard({ title, data, showDelivery }) {
  const { pathname } = useLocation();
  return (
    <div className=" ">
      <div className="flex justify-between items-center gap-4 p-2">
        <h1 className="text-4xl font-extrabold"> {title} </h1>
        <div className="flex justify-between items-center gap-4">
          <h1>See all</h1>
          <div className="flex justify-between items-center">
            <BsArrowLeft />
            <BsArrowRight />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 ">
        {data?.map((item, idx) => {
          return (
            <div className="flex flex-col w-full gap-2">
              <Link
                to={
                  pathname == "/details/menu"
                    ? "/details/revieworder"
                    : "/details/menu"
                }
              >
                <div className="h-[200px] rounded-xl bg-rest-bg bg-cover bg-no-repeat"></div>
              </Link>
              <div className=" flex justify-between items-center  ">
                <p>{item.name}</p>
                {showDelivery && <p>{item.rating}</p>}
              </div>
              <div className="flex">
                <>
                  <p className="mr-1">{item.deliveryfee}</p>
                  {showDelivery && (
                    <p className="whitespace-nowrap">Delivery Fee</p>
                  )}
                </>

                {showDelivery && (
                  <>
                    <p className="mx-1">•</p>
                    <p className="mr-1">{item.deliverytime}</p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default RestaurantCard;
