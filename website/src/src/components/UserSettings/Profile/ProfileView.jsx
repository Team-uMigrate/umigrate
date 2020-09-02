import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { PROGRAM_CHOICES, TERM_CHOICES } from "../../../constants/misc/resourceChoices";
import "./ProfileStyles.css";

const ProfileView = (props) =>
  <div className="Style">
    <h2>Profile Settings</h2>
    <div className="StyleForm">
      <nav className="settings-form">
        <div>
          <Form onSubmit={props.handleSubmit}>
            <Form.Row>
              <Form.Group>
                <div className="imgpreview" style={imgPreviewStyle}>
                  {props.imageElem}
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="bio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="8"
                  defaultValue={props.userData.bio}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group as={Col} controlId="photo">
              <Form.Control type="file" onChange={props.handleImgUpload} />
            </Form.Group>

            <Form.Group as={Row} controlId="enrolled_program">
              <Form.Label column sm="3">
                Program
              </Form.Label>
              <Col sm="8">
                <Form.Control as="select" value={props.enrolled_program} onChange={props.handleProgramInputChange}>
                  {PROGRAM_CHOICES.map((choice, index) => (
                    <option value={index}>{choice}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="current_term">
              <Form.Label column sm="3">
                Current Term
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="select"
                  value={props.current_term}
                  onChange={props.handleTermInputChange}
                >
                  {TERM_CHOICES.map((choice, index) => (
                    <option value={index}>{choice}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="city">
              <Form.Label column sm="3">
                City
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" defaultValue={props.userData.city} />
              </Col>
            </Form.Group>

            <Button
              className="button"
              variant="primary"
              onClick={props.handleSubmit}
            >
              Save Changes
            </Button>
          </Form>
        </div>
      </nav>
    </div>
  </div>
;

const imgPreviewStyle = {
  textAlign: "center",
  marginTop: "5px",
  paddingLeft: "15px",
  marginBottom: "5px",
  paddingRight: "30px",
  height: "250px",
  width: "250px",
  borderLeft: "1px solid gray",
  borderRight: "1px solid gray",
  borderTop: "1px solid gray",
  borderBottom: "1px solid gray",
};
export default ProfileView;
