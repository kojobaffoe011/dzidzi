import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

/**
 * The `Loader` component displays a loading spinner to indicate that a process
 * is in progress. It uses the `PuffLoader` component from the `react-spinners`
 * library and centers it on the screen vertically and horizontally.
 *
 * @returns {JSX.Element} The rendered loading spinner.
 */
const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center z-[9999]">
      <PuffLoader
        color={"blue"}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
