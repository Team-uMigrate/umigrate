import React, { useState, createContext, ReactNode } from 'react';

const AuthContext = createContext({
  /** @type {boolean | null} */
  isAuthenticated: null,
  /** @type {function(boolean | null): void} */
  setIsAuthenticated: function (isAuthenticated) {},
});

/**
 * Provides access to the authentication state.
 * @param {ReactNode} children
 * @return {JSX.Element}
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
