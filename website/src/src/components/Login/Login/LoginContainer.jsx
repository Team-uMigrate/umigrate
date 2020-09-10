import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { BASE_URL, LOGIN_ENDPOINT, USER_PROFILE_ENDPOINT } from "../../../constants/urls/apiUrls";
import { USER_DATA, AUTH_TOKEN } from "../../../constants/misc/sessionStorageKeys";
import LoginView from "./LoginView";
import AuthContext from "../../../contexts/AuthContext";

class LoginContainer extends Component {
  static contextType = AuthContext;

  state = {
    makeAccountRedirect : false,
    showFailureModal : false
  };

  handleNewAccSubmit = (e) => {
    this.setState({makeAccountRedirect : true});
    e.preventDefault();
  };

  handleSubmit = (e) => {
    const data = {
      "email" : document.getElementById("email").value,
      "password" : document.getElementById("password").value
    };

    Axios.post(BASE_URL + LOGIN_ENDPOINT, data)
      .then((response) => {
        // Set authentication token to the header
        Axios.defaults.headers.common['Authorization'] = `Token ${response.data.key}`;
        sessionStorage.setItem(AUTH_TOKEN, response.data.key);

        Axios.get(BASE_URL + USER_PROFILE_ENDPOINT)
          .then((response) => {
            this.context.setAuthenticated(true);

            if(response.data.first_name === ""){
              this.context.setRegistered(false);
            }
            else {
              sessionStorage.setItem(USER_DATA, JSON.stringify(response.data));
              this.context.setRegistered(true);
            }
          })
          // Todo: Check for specific error when receiving the not authenticated message
          .catch((error) =>{
            console.log(error);
            console.log(error.response);
            this.setState({showFailureModal : true});
          });
      })
      // Todo: Check for specific error when receiving the not authenticated message
      .catch((error) =>{
        console.log(error);
        console.log(error.response);
        this.setState({showFailureModal : true});
      });

    e.preventDefault();
  };

  handleClose = () => {
    this.setState({showFailureModal : false});
  };

  getFailureModal = () => {
    return (
      <Modal show={this.state.showFailureModal} onHide={this.handleClose}>
        <Modal.Body>Login failed</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    if (this.state.makeAccountRedirect) {
      return (
        <Redirect to="/register/verification"/>
      )
    }

    else {
      return (
        <div>
          {this.getFailureModal()}
          <LoginView
            handleSubmit={this.handleSubmit}
            handleNewAccSubmit={this.handleNewAccSubmit}
          />
        </div>
      )
    }
  }
}

export default LoginContainer;
