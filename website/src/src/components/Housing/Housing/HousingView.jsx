import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import "./HousingStyles.css"

const HousingView = props =>
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
        <p className="mb-1">{props.features}</p>
        <small>Location: {props.streetAddress}, {props.city}</small>
        <p className="mb-1">{props.term}</p>
        <small>Created: {props.datetimeCreated}</small>
        <hr />
        <small>{props.likedUsers.length} Likes : </small>
        {props.likedUsers.map((user) => (
          <small>{user.first_name} {user.last_name} </small>
        ))}
      </div>
    </div>
  </ListGroup.Item>
;

export default HousingView;
