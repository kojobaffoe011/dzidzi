import { Outlet, Navigate } from "react-router-dom";
import cookie from "../utils/cookie";

/**
 * The `PersistLogin` component manages the persistence of user authentication
 * across different routes. It checks for the presence of an authentication token
 * in a cookie. If there's no authentication token,
 * it redirects the user to the home page.
 */
const PersistLogin = () => {
  // Retrieve the authentication token from cookies
  const token = cookie.getCipher();

  return (
    /* Conditional rendering based on token and loading state */
    <>
      {token ? (
        // If a token exists, render the child routes (Outlet)
        <Outlet />
      ) : (
        // If no token exists, navigate to the home page
        <Navigate to="/" />
      )}
    </>
  );
};

export default PersistLogin;
