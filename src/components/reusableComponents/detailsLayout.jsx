import React from "react";
import { BiChevronDown } from "react-icons/bi";

function DetailsLayout({ children, isRestaurantPage, filters }) {
  return (
    <div className="h-screen">
      <div className="grid-cols-12 grid">
        <div className="col-span-2 p-2  ">
          {isRestaurantPage ? (
            <div>
              {filters?.map((item, idx) => {
                return (
                  <div className="flex justify-between items-center gap-4 p-2">
                    <p> {item}</p>
                    <BiChevronDown />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                {" "}
                <div className="flex flex-col pb-2">
                  <p className="text-3xl font-extrabold "> Menu </p>
                  <p className="underline underline-offset-[10px] decoration-4">11:30AM - 9:00PM</p>
                </div>
              </div>

              <div>
                {filters?.map((item, idx) => {
                  return (
                    <div className="flex justify-between items-center gap-4 p-2">
                      <p> {item}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-10 h-full"> {children}</div>
      </div>
    </div>
  );
}
export  default DetailsLayout;