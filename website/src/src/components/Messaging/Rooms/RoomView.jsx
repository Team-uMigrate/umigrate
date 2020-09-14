import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import "./RoomStyles.css";
import RoomContext from "../../../contexts/RoomContext";
import { getUserData } from "../../../utils/endpoints";

const RoomView = props => {
  const roomContext = useContext(RoomContext);
  const userData = getUserData();

  return (
    <ListGroup.Item>
      <h6 onClick={() => roomContext.setRoom(props)}>
        {props.isDirectMessaging ?
          (userData.id === props.members[0].id ?
            props.members[0].preferred_name : props.members[1].preferred_name)
          : props.title}
      </h6>
    </ListGroup.Item>
  );
};

export default RoomView;
