import React from "react";
import useNetworkStatus from "../hooks/useNetworkStatus";
import { FiWifiOff } from "react-icons/fi";
import Button from "./reusableComponents/Button";
// import Button from "./Button";

/**
 * The `CheckOnlineStatus` component checks the network status and renders its children
 * when the network is online. If the network is offline, it displays a message and a
 * "Try Again" button to prompt the user to check their internet connection and retry.
 *
 * @param {Object} props - React props.
 * @returns {JSX.Element} The rendered component.
 */
const CheckOnlineStatus = (props) => {
  // Retrieve the network status using the `useNetworkStatus` hook
  const status = useNetworkStatus();
  return (
    <div className="">
      {status ? (
        // Render the children components when the network is online
        props.children
      ) : (
        // Render a message and "Try Again" button when the network is offline
        <div className="border min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <FiWifiOff size="10rem" className="mb-3 text-[#0d1655]" />
            <p className="mb-3 text-xs">
              Check your internet connection and try again
            </p>
            <Button
              className="border px-8 py-2 text-xs"
              variant="primary-outline"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOnlineStatus;
