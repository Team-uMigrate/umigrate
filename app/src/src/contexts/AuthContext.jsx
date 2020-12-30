import React, { Component, createContext } from 'react';

const AuthContext = createContext();

// A context provider that stores the user's authentication state
class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
      setIsAuthenticated: (isAuth) => {
        this.setState({ isAuthenticated: isAuth });
      },
    };
  }

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
