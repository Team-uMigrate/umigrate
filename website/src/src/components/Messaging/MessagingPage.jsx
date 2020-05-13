import React, { Component, createRef } from "react";
import MenuBar from "../Common/MenuBar";
import RoomContainer from "./Rooms";
import MessageContainer from "./Messages";

class MessagingPage extends Component {
  constructor(props) {
    super(props);
    this.messageContainerElement = createRef();
  }

  setCurrentRoom = (room) => {
    this.messageContainerElement.current.setCurrentRoom(room);
  };

  render() {
    return(
      <div>
        <MenuBar />
        <div className="row">
          <div className="col-lg-4">
            <RoomContainer setCurrentRoom={this.setCurrentRoom} />
          </div>
          <div className="col-lg-6">
            <MessageContainer ref={this.messageContainerElement} />
          </div>
        </div>
      </div>

    )
  }
}

export default MessagingPage;
