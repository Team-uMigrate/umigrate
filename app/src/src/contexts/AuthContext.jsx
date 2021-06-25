import React, { useState, createContext, ReactNode } from 'react';

const AuthContext = createContext({
  isAuthenticated: null,
  setIsAuthenticated: () => {},
});

/**
 * Provides access to the authentication state
 * @param {ReactNode} children
 * */
const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
export default AuthContext;
