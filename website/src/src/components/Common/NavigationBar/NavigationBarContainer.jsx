import React, { Component } from "react";
import AuthContext from "../../../contexts/AuthContext";
import {USER_DATA} from "../../../constants/misc/localStorageKeys";
import Axios from "axios";
import {BASE_URL, USERS_ENDPOINT} from "../../../constants/urls/apiUrls";
import NavigationBarView from "./NavigationBarView";
import MenuBarView from "../MenuBar";

class NavigationBarContainer extends Component {
  static contextType = AuthContext;

  state = {
    sideDrawerOpen: false,
    displayName: "",
    displayPhoto: null
  };

  componentDidMount = () => {
    let userId = JSON.parse(localStorage.getItem(USER_DATA)).id;

    Axios.get(BASE_URL + USERS_ENDPOINT + userId, {
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        this.setState({ displayName: response.data.first_name });
        this.setState({displayPhoto: response.data.photo});
      })
      .catch((error) => {
        console.log(error);
        if(error.response.status === 401){
          console.log(error);
          this.context.setAuthenticated(true);
          this.context.setRegistered(false);
        }
        return error.response;
      });
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  render() {
    return (
      <div>
        <NavigationBarView
          drawerClickHandler={this.drawerToggleClickHandler}
          title={this.props.title}
        />
        <MenuBarView show={this.state.sideDrawerOpen} click={this.drawerToggleClickHandler}/>
      </div>
    );
  }
}

export default NavigationBarContainer;
