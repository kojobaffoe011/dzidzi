import React, { useCallback, useState } from "react";
import { convertDate, humanDatetime } from "../utils/config";
// import Button from "./Button";
import Loader from "./loaders/Loader";
import Spinner from "./loaders/Spinner";
import ViewRestaurant from "./modal/restaurant/ViewRestaurant";
import NoRecord from "./notices/NoRecord";

const Table = (props) => {
  return (
    <>
      <div>
        {props?.isLoading ? (
          <Loader />
        ) : (
          <div>
            {props?.data?.length > 0 ? (
              <div className="flex flex-col relative shadow-2xl">
                {props?.isLoading && (
                  <div className="absolute z-[999] w-full h-full bg-gray-600 opacity-[0.2] flex justify-center items-center">
                    <Spinner color="#000" className="absolute z-[1000]" />
                  </div>
                )}
                <div className="flex flex-col w-full overflow-x-scroll">
                  {props.children}
                  {/* {(props?.hasNextPage || props?.hasPreviousPage) && (
                    <div className="p-2 border-t bg-white w-full ">
                      <div className="px-2 py-3 flex justify-end items-center border rounded-lg">
                        <div className="flex items-center justify-center">
                          <button
                            onClick={props?.handlePrevious}
                            disabled={
                              !props?.hasPreviousPage || props?.isPreviousData
                            }
                            className="px-4 py-2 rounded-lg mr-2 hover:bg-[#edf0fa] bg-red-500 disabled:cursor-not-allowed text-xs disabled:bg-gray-100"
                          >
                            Previous
                          </button>

                          <button
                            onClick={props?.handleNext}
                            disabled={
                              !props?.hasNextPage || props?.isPreviousData
                            }
                            className="px-4 py-2 rounded-lg ml-2 hover:bg-[#edf0fa] bg-blue-400 text-xs text-xs disabled:cursor-not-allowed disabled:bg-gray-100"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            ) : (
              <NoRecord title={props?.title} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
