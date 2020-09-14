import React, { Component } from "react";
import AdsContainer from "./Ads";
import NavigationBarContainer from "../Common/NavigationBar";

class MarketPage extends Component {
  render() {
    return (
      <div>
        <NavigationBarContainer title="Market" />
        <div className="row">
          <div className="col-lg-6">
            <AdsContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default MarketPage;
