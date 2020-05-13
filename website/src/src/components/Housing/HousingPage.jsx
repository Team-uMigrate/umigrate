import React, { Component } from "react";
import HousingContainer from "./Housing";
import MenuBar from "../Common/MenuBar";

class HousingPage extends Component {
  render() {
    return (
      <div>
        <MenuBar type = "housing"/>
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
