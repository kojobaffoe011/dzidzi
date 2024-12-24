import PropTypes from "prop-types";
import NoRecord from "../notices/NoRecord";
import { RiArrowUpSFill } from "react-icons/ri";
import { useState } from "react";
import { set } from "react-hook-form";

const TableComponent = ({
  tablehead,
  tabledata,
  children,
  sortByColumn,
  filters,
  setFilters,
}) => {
  const [up, setUp] = useState(true);
  const [sortKey, setSortKey] = useState(null);

  return (
    <div>
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
                      console.log(item);
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
          {tabledata?.length > 0 ? <>{children}</> : <NoRecord />}
        </tbody>
      </table>
    </div>
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
};
