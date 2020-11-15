import React, { Component, createContext } from 'react';
import { ProfileEndpoint } from '../utils/endpoints';

const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isAuthenticated: null,
    setAuthenticated: (isAuth) => {
      this.setState({ isAuthenticated: isAuth });
    },
  };

  componentDidMount = () => {
    ProfileEndpoint.get(
      (response) => this.setState({ isAuthenticated: true }),
      (error) => {
        console.log(error);
        console.log(error.response);
        this.setState({ isAuthenticated: false });
      }
    );
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
