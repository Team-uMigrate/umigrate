import React, { Component } from "react";
import { BASE_URL, USERS_ENDPOINT } from "../../../constants/urls/apiUrls";
import {USER_DATA} from "../../../constants/misc/localStorageKeys";
import ProfileView from "./ProfileView";
import updateResource from "../../../utils/api/resources/updateResource";
import retrieveResource from "../../../utils/api/resources/retrieveResource";
import AuthContext from "../../../contexts/AuthContext";

class ProfileContainer extends Component {
  static contextType = AuthContext;

  state = {
    userData: [],
    current_term: null,
    enrolled_program: null,
    file: "",
    photo: "",
    imageElem: null,
    filename: "",
  };
  componentDidMount = () => {
    let userId = JSON.parse(localStorage.getItem(USER_DATA)).id;

    retrieveResource(
      this,
      (data) =>
        this.setState({
          userData: data,
          current_term: data.current_term,
          enrolled_program: data.enrolled_program,
        }),
      BASE_URL + USERS_ENDPOINT,
      userId
    );
  };

  handleImgUpload = (evt) => {
    evt.preventDefault();
    let reader = new FileReader();
    let file = evt.target.files[0];
    //if no file detected, reset the state
    if (!file) {
      this.setState({
        file: "",
        photo: "",
      });
      return;
    }
    reader.readAsDataURL(file);
    var filename = file.name;
    reader.onloadend = () => {
      this.setState({
        file: file,
        photo: reader.result,
        filename: filename,
      });
    };
  };

  handleSubmit = () => {
    let userId = JSON.parse(localStorage.getItem(USER_DATA)).id;

    const data = {
      bio: document.getElementById("bio").value,
      city: document.getElementById("city").value,
      current_term: this.state.current_term,
      enrolled_program: this.state.enrolled_program,
    };

    updateResource(
      this,
      (data) =>
        this.setState({
          userData: data,
          enrolled_program: data.enrolled_program,
          current_term: data.current_term,
        }),
      BASE_URL + USERS_ENDPOINT,
      userId,
      data
    );
  };

  handleTermInputChange = (evt) => {
    this.setState({ current_term: evt.target.value });
  };

  handleProgramInputChange = (evt) => {
    this.setState({ enrolled_program: evt.target.value });
  };

  render() {
    if (this.state.photo) {
      this.state.imageElem = (
        <img src={this.state.photo} style={{ height: "100%", width: "100%" }} />
      );
    } else {
      this.state.imageElem = (
        <img
          src={this.state.userData.photo}
          style={{ height: "100%", width: "100%" }}
        />
      );
    }
    return (
      <ProfileView
        userData={this.state.userData}
        enrolled_program={this.state.enrolled_program}
        current_term={this.state.current_term}
        handleSubmit={this.handleSubmit}
        handleProgramInputChange={this.handleProgramInputChange}
        handleTermInputChange={this.handleTermInputChange}
        handleImgUpload={this.handleImgUpload}
        imageElem={this.state.imageElem}
      />
    );
  }
}

export default ProfileContainer;
