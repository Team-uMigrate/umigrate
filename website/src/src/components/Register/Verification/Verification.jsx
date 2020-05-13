import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { Alert, Form, Col, Button } from 'react-bootstrap';
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import Axios from 'axios';
import { BASE_URL, VERIFICATION_CODE_ENDPOINT, VERIFICATION_EMAIL_ENDPOINT } from "../../../constants/urls/apiUrls";

class Verification extends Component {
  state = {
    show : false,
    registerRedirect : false
  };

  showModal = () => {
    this.setState({show : true});
  };

  hideModal = () => {
    this.setState({show : false});
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email : document.getElementById("email").value
    };

    Axios.post(BASE_URL + VERIFICATION_EMAIL_ENDPOINT, data, { withCredentials: true })
      .then((response) => {
        console.log('Success! ', response);
        this.showModal();
      })
      .catch((error) => {
        console.log('Error. ', error.response);
      });
  };

  handleCodeSubmit = (e) => {
    e.preventDefault();

    const data = {
      verification_code: document.getElementById("code").value
    };
    console.log(data);

    Axios.post(BASE_URL + VERIFICATION_CODE_ENDPOINT, data, { withCredentials: true })
      .then((response) => {
        console.log('Success! ', response);
        this.props.setVer(true);
        this.setState({registerRedirect : true});
      })
      .catch((error) => {
        console.log('Error. ', error.response);
      });
  };

  render() {
    if (this.state.registerRedirect) {
      return <Redirect to="/register/create-user" />
    }
    return (
      <div>
        <Alert style={headerAlertStyle} variant='success'>
          👋 Hey there, send your email and we'll fly an email to verify your Waterloo account!
        </Alert>
        <Carousel style={carouselStyle}>
          <Carousel.Item>
            <img className="d-block w-100"
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                 alt="First slide"
            />
            <Carousel.Caption style={{marginBottom : "20%"}}>
              <h3>Professional Development</h3>
              <p>Maintain an extensive network of young professionals by hosting and joining peer community events.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100"
                 src="https://images.unsplash.com/photo-1536009744269-d24508b32196?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                 alt="Third slide"
            />
            <Carousel.Caption style={{marginBottom : "20%"}}>
              <h3>Simple Socializing</h3>
              <p>Build life-long interpersonal relationships with your peers.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100"
                 src="https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                 lt="Third slide"
            />
            <Carousel.Caption style={{marginBottom : "20%"}}>
              <h3>Convenient Housing</h3>
              <p>Avoid sketchy Facebook co-op housing and less than trustworthy Kijiji sublets.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Form style={formStyle} onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="email">
              <Form.Label> <h3 className="display-4">Your Waterloo Email: </h3></Form.Label>
              <Form.Control required type="email" placeholder="quack123@uwaterloo.ca" />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <ModalHeader>
            <ModalTitle>🦆 Enter your verification code!</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleCodeSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="code">
                  <Form.Label>6 Digit Verification Code: </Form.Label>
                  <Form.Control required type="code" placeholder="324241" />
                </Form.Group>
              </Form.Row>
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.hideModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default Verification;

const formStyle = {
  margin: '5% 30% 5% 30%'
};

const headerAlertStyle = {
  margin : '2% 10% 5% 10%'
};

const carouselStyle = {
  margin : '2% 20% 5% 20%'
};
