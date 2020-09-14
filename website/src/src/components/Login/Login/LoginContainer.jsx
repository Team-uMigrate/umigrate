import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import LoginView from "./LoginView";
import AuthContext from "../../../contexts/AuthContext";
import { AuthEndpoint, ProfileEndpoint } from "../../../utils/endpoints";

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
        ProfileEndpoint.get(
          (response) => {
            if (response.data.first_name === "") {
              this.context.setAuthenticated(true);
              this.context.setRegistered(false);
            }
            else {
              this.context.setAuthenticated(true);
              this.context.setRegistered(true);
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
