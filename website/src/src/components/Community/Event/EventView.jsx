import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./EventStyles.css"

const EventView = props =>
  <ListGroup.Item>
    <div className="row">
      <div className="col-lg-2 col-md-3 col-sm-6">
        <div className="ImageContainer">Placeholder Image</div>
      </div>
      <div className="col-lg-10">
        <div className="d-flex w-100 justify-content-between">
          <h3 className="mb-1">{props.creator.first_name} {props.creator.last_name} - {props.title}</h3>
          <Button onClick={() => props.handleLike(props.id)}><FontAwesomeIcon icon={faThumbsUp}/></Button>
        </div>
        <hr />
        <h5 className="mb-1"> {props.description}</h5>
        <p className="mb-1">{props.region}</p>
        <p className="mb-1">${props.price}</p>
        <small>Location: {props.streetAddress}, {props.city}</small>
        <br />
        <small>Created: {props.datetimeCreated}</small>
        <br />
        <small>Start: {props.startDatetime}</small>
        <br />
        <small>End: {props.endDatetime}</small>
        <hr />
        <small>{props.likedUsers.length} Likes : </small>
        {props.likedUsers.map((user) => (
          <small>{user.first_name} {user.last_name} </small>
        ))}
      </div>
    </div>
  </ListGroup.Item>
;

export default EventView;
