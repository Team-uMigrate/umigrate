import React, { useState, createContext } from 'react';

const TabNavContext = createContext();

// A context provider that stores the tab navigator's navigation prop
const TabNavContextProvider = () => {
  const [navigation, setNavigation] = useState(null);

  return (
    <TabNavContext.Provider
      value={{ navigation: navigation, setNavigation: setNavigation }}
    >
      {this.props.children}
    </TabNavContext.Provider>
  );
};

export { TabNavContextProvider };
export default TabNavContext;
