import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { BASE_URL, LOGIN_ENDPOINT} from "../../../constants/urls/apiUrls";
import { USER_ID } from "../../../constants/misc/localStorageKeys";
import LoginView from "./LoginView";
import AuthContext from "../../../contexts/AuthContext";

class LoginContainer extends Component {
  static contextType = AuthContext;

  state = {
    makeAccountRedirect : false,
    showFailureModal : false
  };

  handleNewAccSubmit = () => {
    this.setState({makeAccountRedirect : true});
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      "email" : document.getElementById("email").value,
      "password" : document.getElementById("password").value
    };

    Axios.post(BASE_URL + LOGIN_ENDPOINT, data, { withCredentials: true })
      .then((response) => {
        console.log("Success! ", response);
        localStorage.setItem(USER_ID, response.data.id);
        this.context.setAuthenticated(true);
      })
      .catch((error) =>{
        console.log("Error. ", error.response);
        this.setState({showFailureModal : true});
      });
  };

  handleClose = () => {
    this.setState({showFailureModal : false});
  };

  getFailureModal = () => {
    return (
      <React.Fragment>
        <Modal.Body>
          <h2>Login failed</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </React.Fragment>
    );
  };

  render() {
    if (this.state.makeAccountRedirect) {
      return (
        <Redirect to="/register/verification"/>
      )
    }

    else if(this.state.showFailureModal){
      return this.getFailureModal();
    }

    return (
      <LoginView
        handleSubmit={this.handleSubmit}
        handleNewAccSubmit={this.handleNewAccSubmit}
      />
    )
  }
}

export default LoginContainer;
