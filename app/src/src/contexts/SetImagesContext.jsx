import React, { useState, createContext } from 'react';

SetImagesContext = createContext({
  /** @type {Array} */
  images: [],
  /** @type {function(Array): void} */
  setImages: (data) => {},
});

/**
 * Provides access to images selected from a user's device through the
 * expo-images-selector (not to be confused with expo-image-selector).
 * @param {ReactNode} children
 * @return {JSX.Element}
 * */
const SetImagesContextProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  return (
    <SetImagesContext.Provider value={{ images, setImages }}>
      {children}
    </SetImagesContext.Provider>
  );
};

export { SetImagesContextProvider };
export default SetImagesContext;
