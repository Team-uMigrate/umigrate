import React, { Component } from 'react'
import { Alert, Form, Col, Button } from 'react-bootstrap';
import Axios from 'axios';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { BASE_URL, USERS_ENDPOINT } from "../../../constants/urls/apiUrls";
import { USER_ID } from "../../../constants/misc/localStorageKeys";
import { PROGRAM_CHOICES, REGION_CHOICES, SEX_CHOICES, TERM_CHOICES } from "../../../constants/misc/resourceChoices";
import AuthContext from "../../../contexts/AuthContext";

class CreateUser extends Component {
  static contextType = AuthContext;

  state = {
    creationFailure : false,
    errorMessage : "",
    file: "",
    imagePreviewUrl: ""
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      "first_name" : document.getElementById("firstName").value,
      "last_name" : document.getElementById("lastName").value,
      "preferred_name" : document.getElementById("preferredName").value,
      "email" : document.getElementById("email").value,
      "sex": document.getElementById("sex").value,
      "birthday" : document.getElementById("birthday").value,
      "bio" : document.getElementById("bio").value,
      "current_term" : document.getElementById("term").value,
      "enrolled_program" : document.getElementById("enrolledProgram").value,
      "region" : document.getElementById("region").value,
      "phone_number" : document.getElementById("phoneNumber").value,
      "current_job" : document.getElementById("currentJob").value,
      "password" : document.getElementById("password").value,
      "street_address" : document.getElementById("streetAddress").value,
      "city" : document.getElementById("city").value,
      "district" : document.getElementById("district").value,
      "country" : document.getElementById("country").value,
    };

    Axios.post(BASE_URL + USERS_ENDPOINT, data, { withCredentials: true })
      .then((response) => {
        console.log("Success! ", response);
        localStorage.setItem(USER_ID, response.data.id);
        this.context.setAuthenticated(true);
      })
      .catch((error) => {
        console.log("Error. ", error.response);
        this.setState({creationFailure : true});
        this.setState({errorMessage : JSON.stringify(error.response.data, null, 4)});
      });
  };

  handleImgUpload = (evt) => {
    evt.preventDefault();
    let reader = new FileReader();
    let file = evt.target.files[0];
    //if no file detected, reset the state
    if (!file) {
      this.setState({
        file: "",
        imagePreviewUrl: ""
      });
      return;
    }
    reader.readAsDataURL(file);
    reader.onloadend= () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
  };

  hideModal = () => {
    this.setState({creationFailure : false});
  };

  render() {
    if (this.state.creationFailure) {
      return (
        <Modal show={true} onHide={this.hideModal} >
          <ModalHeader>
            <ModalTitle>Account Creation failed due to: </ModalTitle>
          </ModalHeader>

          <ModalBody>
            <h2>{this.state.errorMessage}</h2>
          </ModalBody>

          <ModalFooter>
            <Button onClick={this.hideModal}>Cancel</Button>
          </ModalFooter>

        </Modal>
      )
    }

    //renders image on preview panel if present, otherwise displays message
    let imageElem;
    if (this.state.imagePreviewUrl) {
      imageElem = (<img src={this.state.imagePreviewUrl} style={{height: "100%", width: "100%"}}/>)
    }
    else {
      imageElem = (<span>Please Upload an Image</span>)
    }

    return (
      <div>
        <Alert style={headerAlertStyle} variant='success'>
          👋 Hey there! Let's try to get you up and flying! 🦆
        </Alert>
        <Form style={formStyle} onSubmit={this.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control required type="text" placeholder="Goose" />
            </Form.Group>

            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control required type="text" placeholder="McQuack" />
            </Form.Group>

            <Form.Group as={Col} controlId="preferredName">
              <Form.Label>Preferred Name</Form.Label>
              <Form.Control type="text" placeholder="Hiren Patel" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="email">
              <Form.Label>Waterloo Email</Form.Label>
              <Form.Control type="email" placeholder="waterloser@uwaterloo.ca" />
            </Form.Group>

            <Form.Group as={Col} controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="quac123" />
              <Form.Text className="text-muted">
                We'll never share your password with anyone else.
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="profilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file"
                            onChange={this.handleImgUpload}/>
            </Form.Group>

            <Form.Group as={Col} controlId="sex">
              <Form.Label>Sex</Form.Label>
              <Form.Control as="select">
                {SEX_CHOICES.map((choice, index) => (
                  <option value={index}>{choice}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <div className="imgpreview" style={imgPreviewStyle}>
              {imageElem}
            </div>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows="8" placeholder="I long walks around UWP, hissing at stupid first years stuck in a build without air conditioning and proper water." />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="birthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control required type="text" placeholder="YYYY-MM-DD" />
              <Form.Text className="text-muted">
                Please make it the date format shown!
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="region">
              <Form.Label>Region</Form.Label>
              <Form.Control as="select">
                {REGION_CHOICES.map((choice, index) => (
                  <option value={index}>{choice}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>

            <Form.Group as={Col} controlId="streetAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control type="text" placeholder="200 University Ave W" />
            </Form.Group>
            <Form.Group as={Col} controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Waterloo" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="district">
              <Form.Label>Province/State</Form.Label>
              <Form.Control type="text" placeholder="Ontario" />
            </Form.Group>
            <Form.Group as={Col} controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Canada" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="term">
              <Form.Label>Academic Term</Form.Label>
              <Form.Control as="select">
                {TERM_CHOICES.map((choice, index) => (
                  <option value={index}>{choice}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="enrolledProgram">
              <Form.Label>Program</Form.Label>
              <Form.Control as="select">
                {PROGRAM_CHOICES.map((choice, index) => (
                  <option value={index}>{choice}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="226 500 7000" />
            </Form.Group>

            <Form.Group as={Col} controlId="currentJob">
              <Form.Label>Occupation</Form.Label>
              <Form.Control type="text" placeholder="Defecation Developer" />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default CreateUser;

const formStyle = {
  margin: '5% 30% 5% 30%'
};

const headerAlertStyle = {
  margin : '2% 10% 5% 10%'
};

const imgPreviewStyle = {
  textAlign: "center",
  marginTop: "5px",
  paddingLeft: "15px",
  marginBottom:"5px",
  paddingRight:"30px",
  height: "250px",
  width: "250px",
  borderLeft: "1px solid gray",
  borderRight: "1px solid gray",
  borderTop: "1px solid gray",
  borderBottom: "1px solid gray",
};
