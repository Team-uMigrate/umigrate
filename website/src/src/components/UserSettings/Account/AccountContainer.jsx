import React, { Component } from "react";
import { BASE_URL, USERS_ENDPOINT } from "../../../constants/urls/apiUrls";
import {USER_DATA} from "../../../constants/misc/localStorageKeys";
import AccountView from "./AccountView";
import updateResource from "../../../utils/api/resources/updateResource";
import retrieveResource from "../../../utils/api/resources/retrieveResource";
import AuthContext from "../../../contexts/AuthContext";

class AccountContainer extends Component {
  static contextType = AuthContext;

  state = {
    userData: [],
    sex: null,
    region: null
  };

  handleSubmit = () => {
    let userId = JSON.parse(localStorage.getItem(USER_DATA)).id;

    const data = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      preferred_name: document.getElementById("preferred_name").value,
      phone_number: document.getElementById("phone_number").value,
      birthday: document.getElementById("birthday").value,
      sex: this.state.sex,
      region: this.state.region
    };

    updateResource(this, (data) => (this.setState({userData: data, sex: data.sex, region: data.region})),
      BASE_URL + USERS_ENDPOINT, userId, data);
  };

  componentDidMount = () => {
    let userId = JSON.parse(localStorage.getItem(USER_DATA)).id;

    retrieveResource(this, (data) => (this.setState({userData: data, sex: data.sex, region: data.region})),
      BASE_URL + USERS_ENDPOINT, userId);
  };

  handleSexInputChange = (evt) => {
    this.setState({sex: evt.target.value});
  };

  handleRegionInputChange = (evt) => {
    this.setState({region: evt.target.value});
  };

  render() {
    return (
      <AccountView
        userData={this.state.userData}
        sex={this.state.sex}
        region={this.state.region}
        handleSubmit={this.handleSubmit}
        handleSexInputChange={this.handleSexInputChange}
        handleRegionInputChange={this.handleRegionInputChange}
      />
    );
  }
}

export default AccountContainer;
