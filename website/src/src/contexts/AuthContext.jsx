import React, { Component, createContext } from "react";
import Axios from "axios";
import { BASE_URL, LOGIN_ENDPOINT } from "../constants/urls/apiUrls";
import {USER_ID} from "../constants/misc/localStorageKeys";

const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isAuthenticated: null,
    setAuthenticated: (isAuth) => {
      this.setState({isAuthenticated: isAuth})
    }
  };

  componentDidMount = () => {
    Axios.get(BASE_URL + LOGIN_ENDPOINT, { withCredentials: true })
      .then((response) => {
        console.log("Success! " + response.data);
        localStorage.setItem(USER_ID, response.data.id);
        this.setState({isAuthenticated: true});
      })
      .catch((error) => {
        console.log(error.response);
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
