import React, { useState, createContext } from 'react';

const ErrorContext = createContext();

// A context provider that stores the error messages for the error modal
const ErrorContextProvider = () => {
  const [message, setMessage] = useState(null);

  return (
    <ErrorContext.Provider value={{ message: message, setMessage: setMessage }}>
      {this.props.children}
    </ErrorContext.Provider>
  );
};

export { ErrorContextProvider };
export default ErrorContext;
