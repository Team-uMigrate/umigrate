import React, { Component, createContext } from "react";

const ModalContext = createContext();

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
