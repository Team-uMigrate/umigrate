import React from "react";
import {Button, Col, Form} from "react-bootstrap";
import "./LoginStyles.css"

const LoginView = (props) =>
  <div>
    <Form className="formStyle" onSubmit={props.handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="text" placeholder="Enter your email address"/>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Enter your password"/>
        </Form.Group>
      </Form.Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <Form className="formStyle" onSubmit={props.handleNewAccSubmit}>
      <Button variant="primary" onClick={props.handleNewAccSubmit}>
        Don't have an account? Make one!
      </Button>
    </Form>
  </div>
;

export default LoginView;
