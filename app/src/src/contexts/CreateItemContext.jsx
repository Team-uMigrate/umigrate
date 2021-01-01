import React, { useState, createContext } from 'react';

const CreateItemContext = createContext();

// A context provider that stores the create item modal's visibility state
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
