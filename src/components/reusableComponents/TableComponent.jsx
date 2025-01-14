import PropTypes from "prop-types";
import { RiArrowUpSFill } from "react-icons/ri";
import { useState } from "react";
import NoDataFound from "../notices/NoDataFound";
import TableLoader from "../loaders/TableLoader";

const TableComponent = ({
  tablehead,
  tabledata,
  children,
  sortByColumn,
  filters,
  setFilters,
  isLoading,
}) => {
  const [up, setUp] = useState(true);
  const [sortKey, setSortKey] = useState(null);

  return (
    <>
      {isLoading ? (
        <TableLoader />
      ) : (
        <div className="overflow-scroll">
          {tabledata?.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tablehead?.map((item, idx) => {
                    return (
                      <th
                        key={idx}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div
                          className="flex cursor-pointer"
                          onClick={() => {
                            if (!item.sortable) return;
                            sortByColumn(item.sortKey, filters, setFilters);
                            setSortKey(item.sortKey);
                            setUp(!up);
                          }}
                        >
                          <p>{item.title}</p>{" "}
                          {item.sortable &&
                            (up && item.sortKey == sortKey ? (
                              <RiArrowUpSFill />
                            ) : (
                              <RiArrowUpSFill className="transform rotate-180" />
                            ))}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {children}
              </tbody>
            </table>
          ) : (
            <NoDataFound title={"Oops no data to show at the moment"} />
          )}
        </div>
      )}
    </>
  );
};

export default TableComponent;

TableComponent.propTypes = {
  tablehead: PropTypes.array,
  tabledata: PropTypes.array,
  children: PropTypes.node,
  sortByColumn: PropTypes.func,
  setFilters: PropTypes.func,
  filters: PropTypes.array,
  isLoading: PropTypes.bool,
};
