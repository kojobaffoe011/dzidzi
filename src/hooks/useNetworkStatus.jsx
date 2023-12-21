import { useState, useEffect } from "react";

/**
 * The `useNetworkStatus` custom hook monitors the online/offline status of the user's network connection.
 * It uses the `useState` and `useEffect` hooks to track and update the network status in real-time.
 *
 * @returns {Boolean} A boolean value representing the current network status. `true` if online, `false` if offline.
 */
const useNetworkStatus = () => {
  // Initialize the network status state with the current online status
  const [status, setStatus] = useState(navigator.onLine);

  useEffect(() => {
    // Function to handle the "online" event and set the status to true
    const setOnline = () => {
      setStatus(true);
    };

    // Function to handle the "offline" event and set the status to false
    const setOffline = () => {
      setStatus(false);
    };

    // Add event listeners to the window object to track online/offline events
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offlien", setOffline);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  // Return the current network status (true for online, false for offline)
  return status;
};

export default useNetworkStatus;
