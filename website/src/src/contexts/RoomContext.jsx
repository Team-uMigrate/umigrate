import React, { Component, createContext } from "react";

const RoomContext = createContext();

// Allows the messaging page to access the 'room' state
class RoomContextProvider extends Component {
  state = {
    room: null,
    setRoom: (room) => {
      this.setState({room: room})
    }
  };

  render() {
    return (
      <RoomContext.Provider value={this.state}>
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

export { RoomContextProvider };
export default RoomContext;
