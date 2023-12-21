import { useContext } from "react";
import AuthContext from "../context/authProvider";

/**
 * The `useAuth` custom hook provides access to the authentication-related context
 * created by the `AuthProvider` component. It allows components to easily retrieve
 * and update authentication data, such as the authenticated user and persistence status.
 *
 * @returns {Object} An object containing authentication-related data and functions:
 *   - auth: The authenticated user or authentication data.
 *   - setAuth: A function to update the authentication data.
 */
const useAuth = () => {
  // Use the `useContext` hook to retrieve the authentication context from AuthContext
  return useContext(AuthContext);
};

export default useAuth;
