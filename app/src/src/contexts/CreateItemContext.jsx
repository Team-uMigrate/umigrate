import React, { useState, createContext } from 'react';

const CreateItemContext = createContext({
  /** @type {boolean} */
  isModalVisible: false,
  /** @type {function(boolean): void} */
  setIsModalVisible: function (isModalVisible) {},
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
