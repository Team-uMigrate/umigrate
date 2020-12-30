import React, { Component, createContext } from 'react';

const ModalContext = createContext();

// A context provider that stores the modal visibility state
class ModalContextProvider extends Component {
  state = {
    isVisible: false,
    setVisible: (isVisible) => {
      this.setState({ isVisible: isVisible });
    },
  };

  render() {
    return (
      <ModalContext.Provider value={this.state}>
        {this.props.children}
      </ModalContext.Provider>
    );
  }
}

export { ModalContextProvider };
export default ModalContext;
