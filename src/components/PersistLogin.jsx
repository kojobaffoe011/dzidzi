import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "./loaders/Loader";
import cookie from "../utils/cookie";

/**
 * The `PersistLogin` component manages the persistence of user authentication
 * across different routes. It checks for the presence of an authentication token
 * in a cookie and, if available, sets the authenticated user using the `useAuth`
 * hook. Additionally, it handles the loading state, displaying a loader while
 * the authentication state is being determined. If there's no authentication token,
 * it redirects the user to the home page.
 */
const PersistLogin = () => {
  // State to track if the component is in a loading state
  const [isLoading, setIsLoading] = useState(true);
  // Access the setAuth function from the useAuth hook
  // const { setAuth } = useAuth();

  // Retrieve the authentication token from cookies
  const token = cookie.getCipher();

  // // Effect to handle persistent login
  // useEffect(() => {
  //   let isMounted = true;

  //   // Retrieve the logged-in user data from local storage
  //   const loggedInUser = localStorage.getItem("dzidzi");

  //   if (isMounted) {
  //     // If user data exists in local storage, set it as the authenticated user
  //     loggedInUser !== null && setAuth(JSON.parse(loggedInUser));
  //     // Mark loading as complete
  //     setIsLoading(false);
  //   }
  //   return () => (isMounted = false);
  // }, [setAuth]);

  return (
    /* Conditional rendering based on token and loading state */
    <>
      {token ? (
        // If a token exists, render the child routes (Outlet)
        <Outlet />
      ) : isLoading ? (
        // If still loading, render a loader component
        <Loader />
      ) : (
        // If neither token exists nor loading, navigate to the home page
        <Navigate to="/" />
      )}
    </>
  );
};

export default PersistLogin;
