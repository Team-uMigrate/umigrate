import React, { Component, createContext } from 'react';
import { getAuthToken,setAuthToken, removeAuthToken, ProfileEndpoint } from '../utils/endpoints';

const AuthContext = createContext();

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null,
      setAuthenticated: (isAuth) => {
        this.setState({ isAuthenticated: isAuth });
      },
    };
  }

  componentDidMount = async () => {
    // Todo: Check local storage for auth token
    try {
      await ProfileEndpoint.get();
      this.setState({ isAuthenticated: true });
    } catch (error) {
      this.setState({ isAuthenticated: false });
    }
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
