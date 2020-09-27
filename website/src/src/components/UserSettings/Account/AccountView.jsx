import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  REGION_CHOICES,
  SEX_CHOICES,
} from "../../../constants/misc/resourceChoices";
import "./AccountStyles.css";

const AccountView = (props) => (
  <div className="Style">
    <h2>Account Settings</h2>
    <div className="StyleForm">
      <nav className="settings-form">
        <div>
          <Form onSubmit={props.handleSubmit}>
            <Form.Group className="first" as={Row} controlId="first_name">
              <Form.Label column sm="3">
                First Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  size="sm"
                  required
                  type="text"
                  defaultValue={props.userData.first_name}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="last_name">
              <Form.Label column sm="3">
                Last Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  size="sm"
                  required
                  type="text"
                  defaultValue={props.userData.last_name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="preferred_name">
              <Form.Label column sm="3">
                Preferred Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  size="sm"
                  required
                  type="text"
                  defaultValue={props.userData.preferred_name}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="email">
              <Form.Label column sm="3">
                Email
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  className="email"
                  size="sm"
                  readOnly
                  defaultValue={props.userData.email}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="last" controlId="phone_number">
              <Form.Label column sm="3">
                Phone Number
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  defaultValue={props.userData.phone_number}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="birthday">
              <Form.Label column sm="3">
                Birthday
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  defaultValue={props.userData.birthday}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="last" controlId="sex">
              <Form.Label column sm="3">
                Sex
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="select"
                  value={props.sex}
                  onChange={props.handleSexInputChange}
                >
                  {SEX_CHOICES.map((choice, index) => (
                    <option value={index}>{choice}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="last" controlId="region">
              <Form.Label column sm="3">
                Region
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  as="select"
                  value={props.region}
                  onChange={props.handleRegionInputChange}
                >
                  {REGION_CHOICES.map((choice, index) => (
                    <option value={index}>{choice}</option>
                  ))}
                </Form.Control>
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
);
export default AccountView;
