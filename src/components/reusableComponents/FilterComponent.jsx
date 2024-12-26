import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CiFilter, CiSquarePlus } from "react-icons/ci";
import RenderActiveFilters from "./RenderActiveFilters";
import useAuth from "../../hooks/useAuth";
import SideModal from "./SideModal";
import { position } from "../../utils/config";
import { set } from "react-hook-form";

const FilterComponent = ({ filters, setFilters, children, type, top }) => {
  const [open, setOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const [openFilter, setOpenFilter] = useState(false);
  const dropdownRef = useRef(null);
  const [zindex, setZindex] = useState(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!dropdownRef.current.contains(event.target)) {
  //       // Close the dropdown
  //       setOpenFilter(false);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [dropdownRef, openFilter]);

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
      } else {
        return { ...item, value: null, enabled: false };
      }
    });

    setFilters(newFilter);
  };

  console.log(zindex, "zindex from filter");
  return (
    // <div className="flex flex-col" ref={dropdownRef}>
    //   <div className="flex justify-end my-2">
    //     <div
    //       className="px-3 py-1 rounded-md border border-blue-100 border cursor-pointer flex gap-2 hover:bg-blue-50 flex items-center bg-white"
    //       onClick={() => {
    //         setOpenFilter(!openFilter);
    //         setAuth({ ...auth, modal: true });
    //       }}
    //     >
    //       <p className="text-sm text-blue-600">Filter</p>
    //       <CiFilter className="text-blue-600" />
    //     </div>
    //   </div>
    //   {openFilter && (
    //     <div className="flex justify-end relative w-full">
    //       <div className="border border-blue-200 absolute z-[100] w-[40%] bg-white my-1 rounded-md flex flex-col shadow-lg">
    //         <div className="border-b border-blue-100 p-3">
    //           <p className="text-sm">In this view show records where</p>
    //         </div>
    //         {/* {renderActiveFilters()} */}
    //         <RenderActiveFilters
    //           filters={filters}
    //           setFilters={setFilters}
    //           type={type}
    //         />
    //         <div className="grid grid-cols-2 gap-2 p-3">{children}</div>
    //         <div className="border-t border-blue-100 p-3 flex justify-between">
    //           <div
    //             className="px-3 py-1 rounded-md border border-blue-100 border cursor-pointer flex gap-2 hover:bg-blue-50 flex items-center"
    //             onClick={() => {
    //               applyFilters();
    //               setOpenFilter(false);
    //             }}
    //           >
    //             <p className="text-sm">Apply filters</p>
    //             <CiSquarePlus />
    //           </div>
    //           <div
    //             className="px-3 py-1 rounded-md border border-blue-100 border cursor-pointer flex gap-2 hover:bg-red-50 flex items-center bg-red-200"
    //             onClick={() => {
    //               removeFilters();
    //               setOpenFilter(false);
    //             }}
    //           >
    //             <p className="text-sm text-red-600">Clear all filters</p>
    //             <AiOutlineCloseCircle className="text-red-600" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="relative">
      {auth?.modal > 0 && (
        <SideModal
          top={top || "top-[-148px]"}
          right={"right-[-9px]"}
          title={"Filter records"}
          subtext={"Filter records based on your preferences"}
          zindex={zindex || "z-[300]"}
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
                    setAuth({ ...auth, modal: false });
                    setZindex(null);
                  }}
                >
                  <p className="text-sm">Apply filters</p>
                  <CiSquarePlus />
                </div>
                <div
                  className="px-3 py-1 rounded-md border border-blue-100 border cursor-pointer flex gap-2 hover:bg-red-50 flex items-center bg-red-200"
                  onClick={() => {
                    removeFilters();
                    setAuth({ ...auth, modal: false });
                    setZindex(null);
                  }}
                >
                  <p className="text-sm text-red-600">Clear all filters</p>
                  <AiOutlineCloseCircle className="text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </SideModal>
      )}
      <div className="flex justify-end my-2">
        <div
          className="px-3 py-1 rounded-md border border-blue-100 border cursor-pointer flex gap-2 hover:bg-blue-50 flex items-center bg-white"
          onClick={() => {
            setAuth({ ...auth, modal: true });
            setZindex("z-400");
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
