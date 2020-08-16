import React, { useContext } from "react";
import MenuBar from "../Common/MenuBar";
import RoomContainer from "./Rooms";
import MessageContainer from "./Messages";
import RoomContext from "../../contexts/RoomContext";

const MessagingPage = () => {
  const roomContext = useContext(RoomContext);

  return(
    <div>
      <MenuBar />
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
