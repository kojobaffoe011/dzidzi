import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiXCircle } from "react-icons/bi";
import { CiFilter, CiSquarePlus } from "react-icons/ci";

const FilterComponent = ({ filters, setFilters, children, activeFilters }) => {
  const [openFilter, setOpenFilter] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        // Close the dropdown
        setOpenFilter(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef, openFilter]);

  const clearSingleFilter = (name) => {
    const value = filters.map((item) => {
      if (item.name === name) {
        return {
          ...item,
          value: null,
          enabled: false,
        };
      } else {
        return item;
      }
    });

    setFilters(value);
  };

  const applyFilters = () => {
    const newFilter = filters.map((item) => {
      if (item.value) {
        return { ...item, enabled: true };
      } else {
        return item;
      }
    });

    setFilters(newFilter);
  };

  const removeFilters = () => {
    const newFilter = filters.map((item) => {
      return { ...item, value: null, enabled: false };
    });

    setFilters(newFilter);
  };

  const renderActiveFilters = () => {
    if (activeFilters.length > 0) {
      return (
        <div className="flex">
          {activeFilters.map((item, idx) => {
            return (
              <div className="flex" key={idx}>
                <div className="flex px-3 py-1">
                  <div className="flex">
                    <p className="mr-2 text-xs text-gray-500">
                      Filtering by {item.name}: {item.value}
                    </p>
                  </div>
                  <div>
                    <BiXCircle
                      className="text-red-500 cursor-pointer"
                      onClick={() => clearSingleFilter(item.name)}
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

  return (
    <div className="flex flex-col" ref={dropdownRef}>
      <div className="flex justify-end my-2">
        <div
          className="px-3 py-1 rounded-md border border-blue-100 border cursor-pointer flex gap-2 hover:bg-blue-50 flex items-center"
          onClick={() => setOpenFilter(!openFilter)}
        >
          <p className="text-sm">Filter</p>
          <CiFilter className="text-blue-600" />
        </div>
      </div>
      {openFilter && (
        <div className="flex justify-end relative w-full">
          <div className="border border-blue-200 absolute z-[100] w-[40%] bg-white my-1 rounded-md flex flex-col shadow-lg">
            <div className="border-b border-blue-100 p-3">
              <p className="text-sm">In this view show records where</p>
            </div>
            {renderActiveFilters()}
            <div className="grid grid-cols-2 gap-2 p-3">{children}</div>
            <div className="border-t border-blue-100 p-3 flex justify-between">
              <div
                className="px-3 py-1 rounded-md border border-blue-100 border cursor-pointer flex gap-2 hover:bg-blue-50 flex items-center"
                onClick={() => {
                  applyFilters();
                  setOpenFilter(false);
                }}
              >
                <p className="text-sm">Apply filters</p>
                <CiSquarePlus />
              </div>
              <div
                className="px-3 py-1 rounded-md border border-blue-100 border cursor-pointer flex gap-2 hover:bg-red-50 flex items-center bg-red-200"
                onClick={() => {
                  removeFilters();
                  setOpenFilter(false);
                }}
              >
                <p className="text-sm text-red-600">Clear all filters</p>
                <AiOutlineCloseCircle className="text-red-600" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;

FilterComponent.propTypes = {
  filters: PropTypes.array,
  setFilters: PropTypes.func,
  setOpenFilter: PropTypes.func,
  children: PropTypes.node,
  activeFilters: PropTypes.array,
};
