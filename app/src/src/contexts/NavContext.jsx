import React, { useState, createContext } from 'react';

const NavContext = createContext();

// A context provider that stores the navigation prop for sibling navigation screens
const NavContextProvider = () => {
  const [navigation, setNavigation] = useState(null);

  return (
    <NavContext.Provider
      value={{ navigation: navigation, setNavigation: setNavigation }}
    >
      {this.props.children}
    </NavContext.Provider>
  );
};

export { NavContextProvider };
export default NavContext;
