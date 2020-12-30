import React, { Component, createContext } from 'react';

const NavContext = createContext();

// A context provider that stores the navigation prop for sibling navigation screens
class NavContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: null,
      setNavigation: (navigation) => {
        this.setState({ navigation: navigation });
      },
    };
  }
  
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
