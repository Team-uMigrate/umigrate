import React, { Component, createContext } from "react";
import { ProfileEndpoint, getAuthToken, setAuthToken } from "../utils/endpoints";

const AuthContext = createContext();

// Allows other components to access the 'isAuthenticated' and 'isRegistered' states
class AuthContextProvider extends Component {
  state = {
    isAuthenticated: null,
    isRegistered: null,
    setAuthenticated: (isAuth) => {
      this.setState({isAuthenticated: isAuth})
    },
    setRegistered: (isReg) => {
      this.setState({isRegistered: isReg})
    }
  };

  componentDidMount = () => {
    const authToken = getAuthToken();

    if (authToken !== null) {
      setAuthToken(authToken);

      ProfileEndpoint.get(
        (response) => {
          if (response.data.first_name === "") {
            this.setState({isAuthenticated: true, isRegistered: false});
          }
          else {
            this.setState({isAuthenticated: true, isRegistered: true});
          }
        },
        (error) => {
          console.log(error);
          console.log(error.response);
          this.setState({isAuthenticated: false, isRegistered: false});
        }
      );
    }

    else {
      this.setState({isAuthenticated: false, isRegistered: false});
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
