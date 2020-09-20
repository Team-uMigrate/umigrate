import React, { Component, createContext } from "react";

const NavContext = createContext();

class NavContextProvider extends Component {
  state = {
    navigation: null,
    setNavigation: (navigation) => {
      this.setState({ navigation: navigation });
    },
  };

  render() {
    return (
      <NavContext.Provider value={this.state}>
        {this.props.children}
      </NavContext.Provider>
    );
  }
}

export { NavContextProvider };
export default NavContext;
