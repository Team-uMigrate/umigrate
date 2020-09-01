import React, { Component } from "react";
import HousingContainer from "./Housing";
import NavigationBarContainer from "../Common/NavigationBar";

class HousingPage extends Component {
  render() {
    return (
      <div>
        <NavigationBarContainer title="Housing" />
        <div className="row">
          <div className="col-lg-6">
            <HousingContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default HousingPage;
