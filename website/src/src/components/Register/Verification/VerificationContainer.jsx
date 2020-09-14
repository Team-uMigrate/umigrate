import React, { Component } from 'react'
import VerificationView from "./VerificationView";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import { AuthEndpoint } from "../../../utils/endpoints";

class VerificationContainer extends Component {
  state = {
    showSuccessModal: false,
    showFailureModal: false
  };

  hideModal = () => {
    this.setState({showSuccessModal : false, showFailureModal : false});
  };

  handleSubmit = (e) => {
    const data = {
      "email" : document.getElementById("email").value,
      "password1" : document.getElementById("password").value,
      "password2" : document.getElementById("confirm_password").value,
    };

    AuthEndpoint.register(
      data,
      (response) => this.setState({showSuccessModal : true}),
      (error) => {
        console.log(error);
        console.log(error.response);
        this.setState({showFailureModal : true});
      }
    );

    e.preventDefault();
  };

  getSuccessModal = () => {
    return (
      <Modal show={this.state.showSuccessModal} onHide={this.hideModal}>
        <ModalHeader>
          <ModalTitle>🦆 Verification email has been sent! Please check your spam!</ModalTitle>
        </ModalHeader>
      </Modal>
    )
  };

  getFailureModal = () => {
    return (
      <Modal show={this.state.showFailureModal} onHide={this.hideModal}>
        <ModalHeader>
          <ModalTitle>An error has occurred!</ModalTitle>
        </ModalHeader>
      </Modal>
    )
  };

  render () {
    return (
      <div>
        {this.getSuccessModal()}
        {this.getFailureModal()}
        <VerificationView
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default VerificationContainer;
