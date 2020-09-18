import React, { Component } from "react";
import ProfileView from "./ProfileView";
import AuthContext from "../../../contexts/AuthContext";
import { ProfileEndpoint } from "../../../utils/endpoints";

class ProfileContainer extends Component {
  static contextType = AuthContext;

  state = {
    userData: [],
    current_term: null,
    enrolled_program: null,
    file: null,
    photo: null,
    filename: null,
  };

  componentDidMount = () => {
    ProfileEndpoint.get(
      (response) => {
        this.setState({
          userData: response.data,
          current_term: response.data.current_term,
          enrolled_program: response.data.enrolled_program,
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

  handleImgUpload = (evt) => {
    evt.preventDefault();
    let reader = new FileReader();
    let file = evt.target.files[0];
    //if no file detected, reset the state
    if (!file) {
      this.setState({
        file: null,
        photo: null,
        filename: null,
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
    const data = {
      bio: document.getElementById("bio").value,
      city: document.getElementById("city").value,
      current_term: this.state.current_term,
      enrolled_program: this.state.enrolled_program,
      photo: this.state.file ?? "",
    };

    ProfileEndpoint.patch(
      data,
      (response) => {
        this.setState({
          userData: response.data,
          current_term: response.data.current_term,
          enrolled_program: response.data.enrolled_program,
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

  handleTermInputChange = (evt) => {
    this.setState({ current_term: evt.target.value });
  };

  handleProgramInputChange = (evt) => {
    this.setState({ enrolled_program: evt.target.value });
  };

  render() {
    let imageElem = (
      <img
        src={this.state.photo ?? this.state.userData.photo}
        style={{ height: "100%", width: "100%" }}
        alt="Not found"
      />
    );

    return (
      <ProfileView
        userData={this.state.userData}
        enrolled_program={this.state.enrolled_program}
        current_term={this.state.current_term}
        handleSubmit={this.handleSubmit}
        handleProgramInputChange={this.handleProgramInputChange}
        handleTermInputChange={this.handleTermInputChange}
        handleImgUpload={this.handleImgUpload}
        imageElem={imageElem}
      />
    );
  }
}

export default ProfileContainer;
