import React, { useContext } from "react";
import RoomContainer from "./Rooms";
import MessageContainer from "./Messages";
import RoomContext from "../../contexts/RoomContext";
import NavigationBarContainer from "../Common/NavigationBar";

const MessagingPage = () => {
  const roomContext = useContext(RoomContext);

  return(
    <div>
      <NavigationBarContainer title="Messaging" />
      <div className="row">
        <div className="col-lg-4">
          <RoomContainer />
        </div>
        <div className="col-lg-6">
          {roomContext.room === null ?
            <div>
              Please select a room
            </div>
            :
            <MessageContainer room={roomContext.room} />
          }
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
