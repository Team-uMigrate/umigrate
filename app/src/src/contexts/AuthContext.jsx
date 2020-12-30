import React, { Component, createContext } from 'react';
import {
  getAuthToken,
  setAuthToken,
  removeAuthToken,
  ProfileEndpoint,
} from '../utils/endpoints';

const AuthContext = createContext();

// A context provider that stores the user's authentication state
class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: undefined,
      setIsAuthenticated: (isAuth) => {
        this.setState({ isAuthenticated: isAuth });
      },
    };
  }

  componentDidMount = async () => {
    const token = await getAuthToken();

    // Make request to Profile endpoint and set isAuthenticated to true if successful and false otherwise
    if (token != null) {
      await setAuthToken(token);
      try {
        await ProfileEndpoint.get();
        this.setIsAuthenticated(true);
      } catch (error) {
        await removeAuthToken();
        this.setIsAuthenticated(false);
      }
    } else this.setIsAuthenticated(false);
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
