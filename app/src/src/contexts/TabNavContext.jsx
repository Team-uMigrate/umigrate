import React, { useState, createContext } from 'react';

const TabNavContext = createContext({
  navigation: null,
  setNavigation: () => {},
});

/**
 * Provides access to the tab navigator navigation state
 * @param {ReactNode} children
 * */
const TabNavContextProvider = ({ children }) => {
  const [navigation, setNavigation] = useState(null);

  return (
    <TabNavContext.Provider
      value={{ navigation: navigation, setNavigation: setNavigation }}
    >
      {children}
    </TabNavContext.Provider>
  );
};

export { TabNavContextProvider };
export default TabNavContext;
