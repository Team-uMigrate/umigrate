import React, { useState, createContext } from 'react';

const UserViewContext = createContext();
/**
 * Stores the user whose profile is to be shown
 * @param {ReactNode} children
 * @return {JSX.Element}
 * */
const UserViewContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
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
