import React, { Component, createContext } from "react";
import Axios from "axios";
import { BASE_URL, USER_PROFILE_ENDPOINT } from "../constants/urls/apiUrls";
import { USER_DATA } from "../constants/misc/localStorageKeys";

const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isAuthenticated: null,
    setAuthenticated: (isAuth) => {
      this.setState({isAuthenticated: isAuth})
    }
  };

  componentDidMount = () => {
    Axios.get(BASE_URL + USER_PROFILE_ENDPOINT, {withCredentials: true})
      .then((response) => {
        localStorage.setItem(USER_DATA, JSON.stringify(response.data));
        this.setState({isAuthenticated: true});
      })
      // Todo: Check for specific error when receiving the not authenticated message
      .catch((error) => {
        console.log(error);
        this.setState({isAuthenticated: false});
      });
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
