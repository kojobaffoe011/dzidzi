import Spinner from "./loaders/Spinner";
import ForwardSVG from "./ForwardSVG";
import SVG from "./SVG";
import PropTypes from "prop-types";
import NoDataFound from "./notices/NoDataFound";
import TableLoader from "./loaders/TableLoader";

const PaginatedTable = (props) => {
  const {
    isLoading,
    list,
    totalCount,
    dataHasNextPage,
    children,
    // title,
    numberOfPages,
    currentPage,
    setCurrentPage,
  } = props;

  const itemsPerPage = 10; // You can adjust this based on your preference.

  // Calculate the total number of pages based on the total record count and items per page.
  const totalPages = numberOfPages;

  // Function to handle page change.
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the start and end index of the records to display on the current page.
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const maxVisiblePages = 5; // Adjust this number to control how many page numbers to display at a time.

  // Calculate the start and end page numbers to display.
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  // Generate an array of page numbers to display within the specified range.
  const visiblePageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <>
      <div>
        {isLoading ? (
          <TableLoader />
        ) : (
          // ''
          <div>
            {list?.[0]?.results?.length > 0 ? (
              <div className="flex flex-col relative shadow-sm">
                {isLoading && (
                  <div className="absolute z-[999] w-full h-full bg-gray-600 opacity-[0.2] flex justify-center items-center">
                    <Spinner color="#000" className="absolute z-[1000]" />
                  </div>
                )}
                <div className="flex flex-col w-full overflow-x-scroll">
                  {/* TABLE CONTENT GOES HERE */}
                  {children}

                  <div className="p-2 border-t bg-white w-full ">
                    <div className="px-2 py-3 flex justify-between items-center border rounded-lg">
                      <p className="text-sm">
                        Records{" "}
                        <span className="font-bold">
                          {startIndex + 1} - {Math.min(endIndex, totalCount)} of{" "}
                          {totalCount}
                        </span>
                      </p>

                      {dataHasNextPage && (
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            className="mr-6 hover:bg-blue-100  px-4 py-2 rounded-lg disabled:cursor-not-allowed disabled:hover:bg-gray-50"
                          >
                            <SVG />
                          </button>
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg mr-2 hover:bg-blue-100 disabled:cursor-not-allowed disabled:hover:bg-gray-50"
                          >
                            <ForwardSVG />
                          </button>
                          {visiblePageNumbers.map((page) => (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`mx-1 hover:bg-blue-100 hover:text-white px-4 py-2 rounded-lg ${
                                currentPage === page
                                  ? "bg-blue-200 text-white"
                                  : "bg-transaparent"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg ml-2 hover:bg-blue-100 disabled:cursor-not-allowed disabled:hover:bg-gray-50"
                          >
                            <ForwardSVG transform={true} />
                          </button>
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg ml-6 hover:bg-blue-100 disabled:cursor-not-allowed disabled:hover:bg-gray-50"
                          >
                            <SVG transform={true} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <NoDataFound title={"Oops no data to show at the moment"} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PaginatedTable;

PaginatedTable.propTypes = {
  isLoading: PropTypes.bool,
  list: PropTypes.array,
  totalCount: PropTypes.number,
  dataHasNextPage: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  numberOfPages: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};
