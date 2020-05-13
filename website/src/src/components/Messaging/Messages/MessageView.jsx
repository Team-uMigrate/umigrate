import React from "react";
import "./MessageStyles.css"
import { ListGroup } from "react-bootstrap";

const MessageView = props =>
 <ListGroup.Item>
   <h3>{props.content}</h3>
   <h6>{props.creator.preferred_name}    {props.datetimeCreated}</h6>
 </ListGroup.Item>
;

export default MessageView;

