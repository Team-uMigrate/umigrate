import React, { useState, createContext } from 'react';

const ErrorContext = createContext({
  /** @type {string | null} */
  message: null,
  /** @type {function(string | null): void} */
  setMessage: function (message) {},
});

/**
 * Provides access to the error modal message state.
 * @param {ReactNode} children
 * @return {JSX.Element}
 * */
const ErrorContextProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  return (
    <ErrorContext.Provider value={{ message, setMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};

export { ErrorContextProvider };
export default ErrorContext;
