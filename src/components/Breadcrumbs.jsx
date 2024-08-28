import React from "react";
import { HiChevronRight } from "react-icons/hi";

/**
 * The `Breadcrumbs` component displays a breadcrumb trail to help users navigate
 * through different sections of a web application. It receives an array of breadcrumb
 * items and renders them with optional separators (chevron icons).
 *
 * @param {Object} props - React props containing breadcrumbs data.
 * @param {Array} props.breadcrumbs - An array of breadcrumb objects, each having a `text` function.
 * @returns {JSX.Element} The rendered breadcrumb trail.
 */
const Breadcrumbs = ({ breadcrumbs }) => {
  return (
    <div>
      <div
        className={`${
          location.pathname.includes("/dashboard/bookings") ? "" : "mt-3"
        } p-2 flex`}
      >
        {breadcrumbs?.map((item, idx) => {
          return (
            <div className="text-xs flex gap-[0.05rem] items-center" key={idx}>
              {/* Render the breadcrumb text and chevron separator if not the
              last item */}
              {item.text(idx == breadcrumbs.length - 1 ? true : false)}
              {idx == breadcrumbs.length - 1 ? "" : <HiChevronRight />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;
