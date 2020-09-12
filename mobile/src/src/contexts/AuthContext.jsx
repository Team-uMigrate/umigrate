import React, { Component, createContext } from "react";
import Axios from "axios";
import { BASE_URL, USER_PROFILE_ENDPOINT } from "../constants/endpoints";

const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    isAuthenticated: null,
    setAuthenticated: (isAuth) => {
      this.setState({isAuthenticated: isAuth});
    }
  };

  componentDidMount = () => {
    Axios.get(BASE_URL + USER_PROFILE_ENDPOINT)
      .then((response) => {
        this.setState({isAuthenticated: true});
      })
      .catch((error) => {
        console.log(error);
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
