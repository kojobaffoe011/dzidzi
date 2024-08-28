import React from "react";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaMedal } from "react-icons/fa";
import Button from "../Button";

function RestaurantImage({ props }) {
  return (
    <div className="bg-hero-bg bg-cover h-[20vh] relative">
      <div className="absolute flex gap-2 right-8 top-8">
        {props.type == "modal" ? (
          <>
            <Button
              className="text-xs rounded-xl px-4 py-1"
              variant="danger"
              onClick={props.deleteFunction}
            >
              Delete
            </Button>
            <Button
              className="text-xs rounded-xl px-4 py-1 font-bold bg-gray-300 hover:bg-gray-200"
              onClick={props.editFunction}
            >
              Edit
            </Button>
          </>
        ) : (
          <>
            {" "}
            <button className="p-3 bg-white rounded-full">
              <AiOutlineHeart size={"25px"} />{" "}
            </button>
            <button className="p-3 bg-white rounded-full">
              {" "}
              <BsThreeDots size={"25px"} />{" "}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function RestaurantIntro({ props }) {
  return (
    <div className="flex flex-col  gap-2 p-4">
      {" "}
      <div>
        {" "}
        <p className="text-4xl font-extrabold"> {props.name || "Koo Eatery"}</p>
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
            <p>
              {props.rating === 0 ? 0 : props.rating || 4.9} •{" "}
              <span className="text-sm text-gray-400">{props.address}</span>
            </p>
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

const RestaurantDescription = (props) => {
  return (
    <div>
      <RestaurantImage props={props} />
      <RestaurantIntro props={props} />
      {props.children}
    </div>
  );
};

export default RestaurantDescription;
