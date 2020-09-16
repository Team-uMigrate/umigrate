import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { ThumbUp } from "@material-ui/icons";
import "./PostStyles.css";

const PostView = (props) => (
  <ListGroup.Item>
    <div className="row">
      <div className="col-lg-2 col-md-3 col-sm-6">
        <div className="ImageContainer">Placeholder Image</div>
      </div>
      <div className="col-lg-10">
        <div className="d-flex w-100 justify-content-between">
          <h3 className="mb-1">
            {props.creator.first_name} {props.creator.last_name} - {props.title}
          </h3>
          {/*Todo: Use <IconButton> instead of <Button>*/}
          <Button onClick={() => props.handleLike(props.id)}>
            <ThumbUp />
          </Button>
        </div>
        <hr />
        <h5 className="mb-1"> {props.description}</h5>
        <p className="mb-1">{props.region}</p>
        <small>Created: {props.datetimeCreated}</small>
        <hr />
        <small>{props.likedUsers.length} Likes : </small>
        {props.likedUsers.map((user) => (
          <small>
            {user.first_name} {user.last_name}{" "}
          </small>
        ))}
      </div>
    </div>
  </ListGroup.Item>
);
export default PostView;
