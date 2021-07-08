import React, { useState, createContext } from 'react';

const UserViewContext = createContext();

// A context provider that stores the user whose profile is to be shown
const UserViewContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    console.log("USERVIEW", userView),
    <UserViewContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </UserViewContext.Provider>
  );
};

export { UserViewContextProvider };
export default UserViewContext;
