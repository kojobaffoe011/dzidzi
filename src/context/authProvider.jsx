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
  // Initialize the authentication state with an empty object
  const [auth, setAuth] = useState({});

  return (
    // Provide the authentication context with auth, setAuth values
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
