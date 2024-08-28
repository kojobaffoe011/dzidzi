import React from "react";

/**
 * The `NoRecord` component displays a message when no records are found.
 *
 * @param {Object} props - React props for configuring the component.
 * @param {String} props.title - The title or message to display (default is "No Record Found").
 * @returns {JSX.Element} The rendered component for indicating no records found.
 */
const NoRecord = (props) => {
  return (
    <div className="mt-2 flex justify-center bg-white p-4 rounded shadow">
      <p className="text-sm font-bold text-[#9e9e9e]">
        {/* Render the provided title or a default message */}
        {props.title || "No Record Found"}
      </p>
    </div>
  );
};

export default NoRecord;
