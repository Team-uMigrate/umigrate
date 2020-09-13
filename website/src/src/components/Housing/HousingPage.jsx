import React, { Component } from "react";
import ListingsContainer from "./Listings";
import NavigationBarContainer from "../Common/NavigationBar";

class HousingPage extends Component {
  render() {
    return (
      <div>
        <NavigationBarContainer title="Housing" />
        <div className="row">
          <div className="col-lg-6">
            <ListingsContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default HousingPage;
