import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import "./VerificationStyles.css"

const VerificationView = ({ handleSubmit }) => {
  return (
    <div>
      <Form className="formStyle" onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Your Waterloo Email</Form.Label>
            <Form.Control required type="email" placeholder="quack3@uwaterloo.ca" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="password">
            <Form.Label>Your Password</Form.Label>
            <Form.Control required type="password" placeholder="quak1#53a" />
            <Form.Text className="text-muted" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="confirm_password">
            <Form.Label>Confirm Your Password</Form.Label>
            <Form.Control required type="password" placeholder="quak1#53a" />
            <Form.Text className="text-muted" />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Send confirmation email
        </Button>
      </Form>
    </div>
  )
};

export default VerificationView;
