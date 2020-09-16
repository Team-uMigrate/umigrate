import React, { Component } from "react";
import NavigationBarView from "./NavigationBarView";
import MenuBarView from "../MenuBar";

class NavigationBarContainer extends Component {
  state = {
    sideDrawerOpen: false,
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  render() {
    return (
      <div>
        <NavigationBarView
          drawerClickHandler={this.drawerToggleClickHandler}
          title={this.props.title}
        />
        <MenuBarView
          show={this.state.sideDrawerOpen}
          click={this.drawerToggleClickHandler}
        />
      </div>
    );
  }
}

export default NavigationBarContainer;
