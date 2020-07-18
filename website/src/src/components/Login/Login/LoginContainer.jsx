import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { BASE_URL, LOGIN_ENDPOINT, USER_PROFILE_ENDPOINT } from "../../../constants/urls/apiUrls";
import { USER_DATA } from "../../../constants/misc/localStorageKeys";
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

    Axios.post(BASE_URL + LOGIN_ENDPOINT, data, { withCredentials: true})
      .then((response) => {
        Axios.get(BASE_URL + USER_PROFILE_ENDPOINT, { withCredentials: true})
          .then((response) => {
            this.context.setAuthenticated(true);

            if(response.data.first_name === ""){
              this.context.setRegistered(false);
            }
            else {
              this.context.setRegistered(true);
              localStorage.setItem(USER_DATA, JSON.stringify(response.data));
            }
          })
          // Todo: Check for specific error when receiving the not authenticated message
          .catch((error) =>{
            console.log(error);
            this.setState({showFailureModal : true});
          });
      })
      // Todo: Check for specific error when receiving the not authenticated message
      .catch((error) =>{
        console.log(error);
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
