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
    const token = await getAuthToken() ;
    if (token != null){
      await setAuthToken(token);
      try {
        await ProfileEndpoint.get();
        this.setState({ isAuthenticated: true });
      } catch (error) {
        await removeAuthToken();
        this.setState({ isAuthenticated: false });
      }
    }
    else
      this.setState({ isAuthenticated: false });
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
