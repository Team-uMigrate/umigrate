import React, { Component, createContext } from "react";

const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isAuthenticated: true
  };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthContextProvider };
export default AuthContext;
