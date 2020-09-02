import React, { Component } from "react";
import ListingContainer from "./Listings";
import NavigationBarContainer from "../Common/NavigationBar";

class HousingPage extends Component {
  render() {
    return (
      <div>
        <NavigationBarContainer title="Housing" />
        <div className="row">
          <div className="col-lg-6">
            <ListingContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default HousingPage;
