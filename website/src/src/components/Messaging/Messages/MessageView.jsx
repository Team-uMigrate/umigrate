import React from "react";
import "./MessageStyles.css";
import { ListGroup } from "react-bootstrap";

const MessageView = ({ messageBody, creator, datetimeCreated }) => (
  <ListGroup.Item>
    <h3>{messageBody}</h3>
    <h6>
      {creator.preferred_name} {datetimeCreated}
    </h6>
  </ListGroup.Item>
);
export default MessageView;
