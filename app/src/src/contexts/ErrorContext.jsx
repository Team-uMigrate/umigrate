import React, { useState, createContext } from 'react';

const ErrorContext = createContext({ message: null, setMessage: () => {} });

/**
 * Provides access to the error modal message state
 * @param {ReactNode} children
 * */
const ErrorContextProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  return (
    <ErrorContext.Provider value={{ message: message, setMessage: setMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContextProvider };
export default ErrorContext;
