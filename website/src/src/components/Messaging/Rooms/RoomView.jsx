import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import "./RoomStyles.css";
import { USER_DATA } from "../../../constants/misc/sessionStorageKeys";
import RoomContext from "../../../contexts/RoomContext";

const RoomView = props => {
  const roomContext = useContext(RoomContext);

  return (
    <ListGroup.Item>
      <h6 onClick={() => roomContext.setRoom(props)}>
        {props.isDirectMessaging ?
          (JSON.parse(sessionStorage.getItem(USER_DATA)).id === props.members[0].id ?
            props.members[0].preferred_name : props.members[1].preferred_name)
          : props.title}
      </h6>
    </ListGroup.Item>
  );
};

export default RoomView;
