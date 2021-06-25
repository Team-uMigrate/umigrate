import React, { useState, createContext } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

const initialState = {
  /** @type {StackNavigationProp | null} */
  navigation: null,
  /** @type {function(StackNavigationProp | null): void} */
  setNavigation: function (navigation) {},
};
const TabNavContext = createContext(initialState);

/**
 * Provides access to the tab navigator navigation state.
 * @param {ReactNode} children
 * @return {JSX.Element}
 * */
const TabNavContextProvider = ({ children }) => {
  const [navigation, setNavigation] = useState(initialState.navigation);

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
