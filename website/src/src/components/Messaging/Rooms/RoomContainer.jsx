import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import RoomView from "./RoomView";
import listResource from "../../../utils/api/resources/listResource";
import AuthContext from "../../../contexts/AuthContext";
import {BASE_URL, ROOMS_ENDPOINT} from "../../../constants/urls/apiUrls";
import {REGION_CHOICES} from "../../../constants/misc/resourceChoices";

class RoomContainer extends Component {
  static contextType = AuthContext;

  state = {
    rooms: []
  };

  componentDidMount = () => {
    this.loadRooms();
  };

  loadRooms = () => {
    listResource(this, (data) => this.setState({rooms: data}), BASE_URL + ROOMS_ENDPOINT);
  };

  render () {
    return (
      <div>
        <h1>rooms</h1>
        <ListGroup>
          {this.state.rooms.map((room) => (
            <RoomView
              key={room.id}
              id={room.id}
              title={room.title}
              description={room.description}
              region={REGION_CHOICES[room.region]}
              datetimeCreated={room.datetime_created}
              isDirectMessaging={room.is_direct_messaging}
              creator={room.creator}
              members={room.members}
              setCurrentRoom={this.props.setCurrentRoom}
            />
          ))}
        </ListGroup>
      </div>

    )
  }

}

export default RoomContainer;
