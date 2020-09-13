import React, { Component, createContext } from "react";
import { USER_DATA, AUTH_TOKEN } from "../constants/misc/sessionStorageKeys";
import { ProfileEndpoint } from "../utils/endpoints";
import Axios from "axios";

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
    // Set authentication token to the header
    const authToken = sessionStorage.getItem(AUTH_TOKEN);
    if (authToken !== null) {
      Axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
    }

    ProfileEndpoint.get(
      (response) => {
        if (response.data.first_name === "") {
          this.setState({isRegistered: false, isAuthenticated: true});
        }
        else {
          sessionStorage.setItem(USER_DATA, JSON.stringify(response.data));
          this.setState({isRegistered: true, isAuthenticated: true});
        }
      },
      (error) => {
        console.log(error);
        console.log(error.response);
        this.setState({isAuthenticated: false});
        this.setState({isRegistered: false});
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
