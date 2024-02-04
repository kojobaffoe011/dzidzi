import React from "react";
import Button from "../../../components/Button";
import food from "../../../assets/landingpage/defaultrest.jpeg";

const ReviewOrder = () => {
  return (
    <div className="max-w-[1024px] mx-auto w-full flex-col flex">
      <div className="grid grid-cols-2 p-2 gap-2">
        <div className="flex items-center justify-center">
          <img src={food} alt="" width={"300px"} />
        </div>
        <div className="border border-red flex-col flex">
          <div className="flex flex-col gap-1">
            <h1 className="font-extrabold text-3xl">
              Koo Eatery, Steak with Vegetable Salad
            </h1>
            <p className="font-bold text-gray-500 text-xl">€10.99</p>
          </div>
          <div className="flex flex-col mt-8">
            <div>
              <select name="quantity" id="plan">
                <option value="1" selected>
                  {" "}
                  1{" "}
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            {/* <p className="font-bold text-gray-500 text-md">€ 10.99</p> */}
            <Button className="bg-black py-3 mt-3 hover:bg-gray-600" rounded>
              <p className="text-white font-bold">Add to Order • €10.99</p>
            </Button>
          </div>
          <div className="flex flex-col mt-8">
            <h1 className="font-extrabold text-xl">Description</h1>
            <p className="font-light text-gray-500 text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
