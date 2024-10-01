import { useEffect } from "react";
import { createContext, useState } from "react";

// Create an empty context to manage authentication-related data
const AuthContext = createContext({});

/**
 * The `AuthProvider` component serves as a context provider for managing authentication-related data.
 * It uses React's `useState` hook to maintain the authentication state.
 *
 * @param {Object} props - React props, typically containing child components.
 * @param {JSX.Element} props.children - An array of breadcrumb objects, each having a `text` function.
 * @returns {JSX.Element} A context provider that wraps its child components.
 */
export const AuthProvider = ({ children }) => {
  // Retrieve the auth data from localStorage if it exists, otherwise initialize with an empty object
  const storedAuth = localStorage.getItem("dzidzi");
  const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};

  const [auth, setAuth] = useState(initialAuth);

  // Use useEffect to update localStorage whenever the auth state changes
  useEffect(() => {
    localStorage.setItem("dzidzi", JSON.stringify(auth));
  }, [auth]);

  return (
    // Provide the authentication context with auth, setAuth values
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
