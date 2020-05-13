import React from "react";
import { ListGroup } from "react-bootstrap";
import "./RoomStyles.css";
import {USER_ID} from "../../../constants/misc/localStorageKeys";

const RoomView = props =>
  <ListGroup.Item>
    <h6 onClick={() => props.setCurrentRoom(props)}>
      {props.isDirectMessaging ?
        (localStorage.getItem(USER_ID) === props.members[0].id ?
          props.members[0].preferred_name : props.members[1].preferred_name)
        : props.title}
    </h6>
  </ListGroup.Item>
;

export default RoomView;
