import React, { useState, createContext } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

const initialState = {
  /** @type {StackNavigationProp | null} */
  navigation: null,
  /** @type {function(StackNavigationProp | null): void} */
  setNavigation: function (navigation) {},
};
const StackNavContext = createContext(initialState);

/**
 * Provides access to the stack navigator navigation state.
 * @param {ReactNode} children
 * @return {JSX.Element}
 * */
const StackNavContextProvider = ({ children }) => {
  const [navigation, setNavigation] = useState(initialState.navigation);

  return (
    <StackNavContext.Provider value={{ navigation, setNavigation }}>
      {children}
    </StackNavContext.Provider>
  );
};

export { StackNavContextProvider };
export default StackNavContext;
