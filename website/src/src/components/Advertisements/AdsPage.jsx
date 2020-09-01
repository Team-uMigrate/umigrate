import React, { Component } from "react";
import AdContainer from "./Ad";
import NavigationBarContainer from "../Common/NavigationBar";

class AdsPage extends Component {
  render() {
    return (
      <div>
        <NavigationBarContainer title="Advertisements" />
        <div className="row">
          <div className="col-lg-6">
            <AdContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default AdsPage;
