import React, { Component, createContext } from 'react';

const ErrorContext = createContext();

// A context provider that stores the error state
class ErrorContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      setMessage: (message) => {
        this.setState({ message: message });
      },
      removeMessage: () => {
        this.setState({message: null});
      },
    };
  }

  render() {
    return (
      <ErrorContext.Provider value={this.state}>
        {this.props.children}
      </ErrorContext.Provider>
    );
  }
}

export { ErrorContextProvider };
export default ErrorContext;
