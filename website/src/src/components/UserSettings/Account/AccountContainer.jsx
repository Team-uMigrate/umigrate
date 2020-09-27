import React, { Component } from "react";
import AccountView from "./AccountView";
import AuthContext from "../../../contexts/AuthContext";
import { ProfileEndpoint } from "../../../utils/endpoints";

class AccountContainer extends Component {
  static contextType = AuthContext;

  state = {
    userData: [],
    sex: null,
    region: null,
  };

  handleSubmit = () => {
    const data = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      preferred_name: document.getElementById("preferred_name").value,
      phone_number: document.getElementById("phone_number").value,
      birthday: document.getElementById("birthday").value,
      sex: this.state.sex,
      region: this.state.region,
    };

    ProfileEndpoint.patch(
      data,
      (response) => {
        this.setState({
          userData: response.data,
          sex: response.data.sex,
          region: response.data.region,
        });
      },
      (error) => {
        if (error.response != null && error.response.status === 401) {
          this.context.setAuthenticated(false);
          this.context.setRegistered(false);
        }
      }
    );
  };

  componentDidMount = () => {
    ProfileEndpoint.get(
      (response) => {
        this.setState({
          userData: response.data,
          sex: response.data.sex,
          region: response.data.region,
        });
      },
      (error) => {
        if (error.response != null && error.response.status === 401) {
          this.context.setAuthenticated(false);
          this.context.setRegistered(false);
        }
      }
    );
  };

  handleSexInputChange = (evt) => {
    this.setState({ sex: evt.target.value });
  };

  handleRegionInputChange = (evt) => {
    this.setState({ region: evt.target.value });
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
