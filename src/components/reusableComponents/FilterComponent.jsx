import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CiFilter, CiSquarePlus } from "react-icons/ci";
import RenderActiveFilters from "./RenderActiveFilters";
import SideModal from "./SideModal";
import useModal from "../../hooks/useModal";

const FilterComponent = ({ filters, setFilters, children, type, top }) => {
  const [open, setOpen] = useState(false);
  const { open: modalOpen } = useModal();

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
      if (type === null || type === undefined) {
        return { ...item, value: null, enabled: false };
      }

      if (type === "menus" && item.name === "RESTAURANT ID") {
        return { ...item };
      } else if (item.name.toLowerCase().includes("id")) {
        return { ...item };
      } else {
        return { ...item, value: null, enabled: false };
      }
    });

    setFilters(newFilter);
  };

  return (
    <div className="relative">
      <SideModal
        top={top || "top-[-148px]"}
        right={"right-[-9px]"}
        title={"Filter records"}
        subtext={"Filter records based on your preferences"}
        open={open}
        setOpen={setOpen}
      >
        <div className="w-full ">
          <div className="z-[100] bg-white my-1 rounded-md flex flex-col w-full">
            <RenderActiveFilters
              filters={filters}
              setFilters={setFilters}
              type={type}
            />
            <div className="flex flex-col w-full gap-2 mt-4">{children}</div>
            <div className="border-t border-blue-100 py-3 flex justify-between mt-5">
              <div
                className="px-3 py-1 rounded-md border border-blue-100 border cursor-pointer flex gap-2 hover:bg-blue-50 flex items-center"
                onClick={() => {
                  applyFilters();
                  setOpen(false);
                }}
              >
                <p className="text-sm">Apply filters</p>
                <CiSquarePlus />
              </div>
              <div
                className="px-3 py-1 rounded-md border border-blue-100 border cursor-pointer flex gap-2 hover:bg-red-50 flex items-center bg-red-200"
                onClick={() => {
                  removeFilters();
                  setOpen(false);
                }}
              >
                <p className="text-sm text-red-600">Clear all filters</p>
                <AiOutlineCloseCircle className="text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </SideModal>
      <div className="flex justify-end my-2">
        <div
          className="px-3 py-1 rounded-md border border-blue-100 border cursor-pointer flex gap-2 hover:bg-blue-50 flex items-center bg-white"
          onClick={() => {
            setOpen(true);
          }}
        >
          <p className="text-sm text-blue-600">Filter</p>
          <CiFilter className="text-blue-600" />
        </div>
      </div>
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
  type: PropTypes.string,
  top: PropTypes.string,
};
