import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { USER_DATA, AUTH_TOKEN } from "../../../constants/misc/sessionStorageKeys";
import LoginView from "./LoginView";
import AuthContext from "../../../contexts/AuthContext";
import { AuthEndpoint, ProfileEndpoint } from "../../../utils/endpoints";
import Axios from "axios";

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

    AuthEndpoint.login(
      data,
      (response) => {
        // Set authentication token to the header
        Axios.defaults.headers.common['Authorization'] = `Token ${response.data.key}`;
        sessionStorage.setItem(AUTH_TOKEN, response.data.key);

        ProfileEndpoint.get(
          (response) => {
            if (response.data.first_name === "") {
              this.setState({isRegistered: false, isAuthenticated: true});
            }
            else {
              sessionStorage.setItem(USER_DATA, JSON.stringify(response.data));
              this.setState({isRegistered: true, isAuthenticated: true});
            }
          },
          (error) => {
            console.log(error);
            console.log(error.response);
            this.setState({showFailureModal : true});
          }
        );
      },
      (error) => {
        console.log(error);
        console.log(error.response);
        this.setState({showFailureModal : true});
      }
    );

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
