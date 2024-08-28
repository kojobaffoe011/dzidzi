import React, { useState } from "react";
import Button from "../../../components/Button";
import food from "../../../assets/landingpage/defaultrest.jpeg";
import { useParams } from "react-router";
import { useGetSingleMenu } from "../../../components/brokers/apicalls";
import Loader from "../../../components/loaders/Loader";

const ReviewOrder = () => {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const { id } = useParams();
  const {
    isLoading: menuLoading,
    data: menuData,
    isError,
    error,
  } = useGetSingleMenu(id);

  console.log(menuData);

  if (menuLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-[1024px] mx-auto w-full flex-col flex h-full">
      <div>
        <p>Back to {menuData?.restaurant?.name}</p>
      </div>
      <div className="grid grid-cols-2 p-2 gap-2">
        <div className="flex items-center justify-center">
          <img src={food} alt="" width={"300px"} />
        </div>
        <div className="border border-red flex-col flex">
          <div className="flex flex-col gap-1">
            <h1 className="font-extrabold text-3xl">{menuData?.name}</h1>
            <p className="font-bold text-gray-500 text-xl">
              € {menuData?.price}
            </p>
          </div>
          <div className="flex flex-col mt-8">
            <div>
              <select
                name="quantity"
                id="plan"
                onChange={(e) => setSelectedNumber(e.currentTarget.value)}
              >
                {Array(99)
                  .fill("")
                  .map((item, idx) => {
                    return (
                      <option defaultValue={1} key={idx} value={idx + 1}>
                        {idx + 1}
                      </option>
                    );
                  })}

                {/* <option value="2">2</option>
                <option value="3">3</option> */}
              </select>
            </div>
            {/* <p className="font-bold text-gray-500 text-md">€ 10.99</p> */}
            <Button className="bg-black py-3 mt-3 hover:bg-gray-600" rounded>
              <p className="text-white font-bold">
                Add {selectedNumber} Order • €{" "}
                {selectedNumber * menuData?.price}
              </p>
            </Button>
          </div>
          <div className="flex flex-col mt-8">
            <h1 className="font-extrabold text-xl">Description</h1>
            <p className="font-light text-gray-500 text-sm">
              {menuData?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
