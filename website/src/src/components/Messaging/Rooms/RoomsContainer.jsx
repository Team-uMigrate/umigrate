import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import RoomView from "./RoomView";
import AuthContext from "../../../contexts/AuthContext";
import { REGION_CHOICES } from "../../../constants/misc/resourceChoices";
import { RoomsEndpoint } from "../../../utils/endpoints";
import cleanLoadedResources from "../../../utils/cleanLoadedResources";

class RoomsContainer extends Component {
  static contextType = AuthContext;

  state = {
    rooms: [],
    page: 1
  };

  componentDidMount = () => {
    this.loadRooms();
  };

  loadRooms = () => {
    RoomsEndpoint.list(
      this.state.page,
      {},
      (response) => this.setState({messages: cleanLoadedResources(this.state.rooms, response.data).reverse(), page: this.state.page + 1}),
      (error) => {
        if (error.response != null && error.response.status === 401) {
          this.context.setAuthenticated(false);
          this.context.setRegistered(false);
        }
      }
    );
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
            />
          ))}
        </ListGroup>
      </div>

    )
  }

}

export default RoomsContainer;
