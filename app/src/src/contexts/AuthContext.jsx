import React, { useState, createContext } from 'react';

const AuthContext = createContext();

// A context provider that stores the user's authentication state
const AuthContextProvider = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
      }}
    >
      {this.props.children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
export default AuthContext;
