//render active filters to screen

import { BiXCircle } from "react-icons/bi";
import { activeFilters, clearSingleFilter } from "../../utils/config";
import PropTypes from "prop-types";

const RenderActiveFilters = ({ filters, setFilters }) => {
  const renderActiveFilters = () => {
    if (activeFilters(filters).length > 0) {
      return (
        <div className="flex">
          {activeFilters(filters).map((item, idx) => {
            return (
              <div className="flex" key={idx}>
                <div className="flex px-3 py-1">
                  <div className="flex">
                    <p className="mr-2 text-xs text-gray-500">
                      {idx == 0 && "Filtering by"} {item.name}: {item.value}
                    </p>
                  </div>
                  <div>
                    <BiXCircle
                      className="text-red-500 cursor-pointer"
                      onClick={() =>
                        clearSingleFilter(item.name, filters, setFilters)
                      }
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };
  return <div>{renderActiveFilters()}</div>;
};

export default RenderActiveFilters;

RenderActiveFilters.propTypes = {
  activeFilters: PropTypes.func,
  filters: PropTypes.array,
  setFilters: PropTypes.func,
};
