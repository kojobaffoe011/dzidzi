import React, { useCallback, useState } from "react";
import { convertDate, humanDatetime } from "../utils/config";
import Button from "./Button";
// import InvoiceModal from "../modal/checkin/InvoiceModal";
// import SVG from "../SVG";
// import ForwardSVG from "../ForwardSVG";
import Loader from "./loaders/Loader";
import Spinner from "./loaders/Spinner";
import ViewRestaurant from "./modal/restaurant/ViewRestaurant";
import NoRecord from "./notices/NoRecord";

const TableAlt = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cursor, setCursor] = useState(null);

  const handlePageChange = (newPage, direction) => {
    if (direction === "FORWARD") {
      props?.setDirection(direction);
      props?.setCursor(newPage);
    } else if (direction === "BACKWARDS") {
      props?.setDirection(direction);
      props?.setCursor(newPage);
    }
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(props?.totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const visiblePageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // const itemsPerPage = 10; // You can adjust this based on your preference.

  // Calculate the total number of pages based on the total record count and items per page.
  // const totalPages = Math.ceil(props.totalCount / itemsPerPage);

  // Function to handle page change.
  // const handlePageChange = (page) => {
  //   props?.setCurrentPage(page);
  // };

  // Calculate the start and end index of the records to display on the current page.
  // const startIndex = (props?.currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  // const maxVisiblePages = 5; // Adjust this number to control how many page numbers to display at a time.

  // Calculate the start and end page numbers to display.
  // const startPage = Math.max(
  //   1,
  //   props?.currentPage - Math.floor(maxVisiblePages / 2)
  // );
  // const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Generate an array of page numbers to display within the specified range.
  // const visiblePageNumbers = Array.from(
  //   { length: endPage - startPage + 1 },
  //   (_, i) => startPage + i
  // );

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
                  <div className="p-2 border-t bg-white w-full ">
                    <div className="px-2 py-3 flex justify-between items-center border rounded-lg">
                      <p className="text-sm">
                        Total Records -{" "}
                        <span className="font-bold">
                          {/* {startIndex + 1} -{" "}
                          {Math.min(endIndex, props.totalCount)} of{" "} */}
                          {props.totalCount}
                        </span>
                      </p>

                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => props?.handlePrevious()}
                          disabled={!props?.hasPreviousPage || props?.isLoading}
                          className="px-4 py-2 rounded-lg mr-2 hover:bg-[#edf0fa] bg-red-500 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() =>
                            props?.handleNext(props?.cursor, "FORWARD")
                          }
                          disabled={!props?.hasNextPage || props?.isLoading}
                          className="px-4 py-2 rounded-lg ml-2 hover:bg-[#edf0fa] bg-blue-400 text-xs"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
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

export default TableAlt;
