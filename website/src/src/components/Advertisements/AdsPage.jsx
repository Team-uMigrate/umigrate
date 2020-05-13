import React, { Component } from "react";
import AdContainer from "./Ad";
import MenuBar from "../Common/MenuBar";

class AdsPage extends Component {
  render() {
    return (
      <div>
        <MenuBar type="advertisements" />
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
