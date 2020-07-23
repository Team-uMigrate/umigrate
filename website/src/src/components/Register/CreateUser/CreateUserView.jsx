import React from "react";
import {Alert, Button, Col, Form} from "react-bootstrap";
import {PROGRAM_CHOICES, REGION_CHOICES, SEX_CHOICES, TERM_CHOICES} from "../../../constants/misc/resourceChoices";
import "./CreateUserStyles.css"

const CreateUserView = ({handleSubmit, handleImageUpload, imagePreviewUrl}) => {
  return (
    <div>
      <Alert className="headerAlertStyle" variant='success'>
        👋 Hey there! Let's try to get you up and flying! 🦆
      </Alert>
      <Form className="formStyle" onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text" placeholder="Goose" />
          </Form.Group>

          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required type="text" placeholder="McQuack" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="preferredName">
            <Form.Label>Preferred Name</Form.Label>
            <Form.Control type="text" placeholder="Hiren Patel" />
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
          <Form.Group as={Col} controlId="profilePicture">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file"
                          onChange={handleImageUpload}/>
          </Form.Group>

          <div className="imgPreviewStyle">
            {imagePreviewUrl === ""
              ? <span>Upload an Image!</span>
              : <img src={imagePreviewUrl} style={{height: "100%", width: "100%"}} alt="image not found"/>
            }
          </div>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="birthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control required type="text" placeholder="YYYY-MM-DD" />
            <Form.Text className="text-muted">
              Please make it the date format shown!
            </Form.Text>
          </Form.Group>

          <Form.Group as={Col} controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="226 500 7000" />
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
          <Form.Group as={Col} controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" rows="8" placeholder="I long walks around UWP, hissing at stupid first years stuck in a build without air conditioning and proper water." />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  )
};

export default CreateUserView;

