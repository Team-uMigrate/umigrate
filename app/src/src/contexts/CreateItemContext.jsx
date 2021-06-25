import React, { useState, createContext } from 'react';

const CreateItemContext = createContext({
  isModalVisible: false,
  setIsModalVisible: () => {},
});

/**
 * Provides access to the create item modal visibility state
 * @param {ReactNode} children
 * @return {JSX.Element}
 * */
const CreateItemContextProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <CreateItemContext.Provider
      value={{
        isModalVisible: isModalVisible,
        setIsModalVisible: setIsModalVisible,
      }}
    >
      {children}
    </CreateItemContext.Provider>
  );
};

export { CreateItemContextProvider };
export default CreateItemContext;
