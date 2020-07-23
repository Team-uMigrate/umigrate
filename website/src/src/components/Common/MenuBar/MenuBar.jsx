import React, { Component } from "react";
import SettingsTopbar from "../../UserSettings/Common/SettingsBar/SettingsTopbar";
import CommunityTopbar from "../../Community/CommunityToolbar/CommunityTopbar";
import HousingTopbar from "../../Housing/HousingToolbar/HousingTopbar";
import AdTopbar from "../../Advertisements/AdToolbar/AdTopbar";
import SideBar from "./SideBar";
import Backdrop from "./BackDrop";
import Axios from "axios";
import { BASE_URL, USERS_ENDPOINT } from "../../../constants/urls/apiUrls";
import { USER_DATA } from "../../../constants/misc/localStorageKeys";
import AuthContext from "../../../contexts/AuthContext";

class MenuBar extends Component {
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
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.drawerToggleClickHandler} />;
    }

    if (this.props.type === "community") {
      return (
        <div>
          <CommunityTopbar
            displayName={this.state.displayName}
            displayPhoto={this.state.displayPhoto}
            drawerClickHandler={this.drawerToggleClickHandler}
          />
          <SideBar show={this.state.sideDrawerOpen} />
          {backdrop}
        </div>
      );
    } else if (this.props.type === "housing") {
      return (
        <div>
          <HousingTopbar
            displayName={this.state.displayName}
            displayPhoto={this.state.displayPhoto}
            drawerClickHandler={this.drawerToggleClickHandler}
          />
          <SideBar show={this.state.sideDrawerOpen} />
          {backdrop}
        </div>
      );
    } else if (this.props.type === "settings") {
      return (
        <div>
          <SettingsTopbar
            displayName={this.state.displayName}
            displayPhoto={this.state.displayPhoto}
            drawerClickHandler={this.drawerToggleClickHandler}
          />
          <SideBar show={this.state.sideDrawerOpen} />
          {backdrop}
        </div>
      );
    } else if (this.props.type === "advertisements") {
      return (
        <div>
          <AdTopbar
            displayName={this.state.displayName}
            displayPhoto={this.state.displayPhoto}
            drawerClickHandler={this.drawerToggleClickHandler}
          />
          <SideBar show={this.state.sideDrawerOpen} />
          {backdrop}
        </div>
      );
    }

    return (
      //return default topbar if no type is specified
      <div>
        <SettingsTopbar
          displayName={this.state.displayName}
          displayPhoto={this.state.displayPhoto}
          drawerClickHandler={this.drawerToggleClickHandler}
        />
        <SideBar show={this.state.sideDrawerOpen} />
        {backdrop}
      </div>
    );
  }
}

export default MenuBar;
