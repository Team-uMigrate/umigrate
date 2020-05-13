import React, { Component } from "react";
import MenuBar from "../Common/MenuBar";
import PostContainer from "./Post";
import EventContainer from "./Event";

class CommunityPage extends Component {
  render() {
    return (
      <div>
        <MenuBar type ="community"/>
        <div className="row">
          <div className="col-lg-8 col-md-6 col-sm-12">
            <PostContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default CommunityPage;
