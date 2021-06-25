import React, { useState, createContext } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const defaultValue = {
  /** @type {BottomTabNavigationProp | null} */
  navigation: null,
  /** @type {function(BottomTabNavigationProp | null): void} */
  setNavigation: function (navigation) {},
};
const TabNavContext = createContext(defaultValue);

/**
 * Provides access to the tab navigator navigation state
 * @param {ReactNode} children
 * @return {JSX.Element}
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
