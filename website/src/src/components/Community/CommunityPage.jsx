import React, { Component } from "react";
import PostContainer from "./Post";
import NavigationBarContainer from "../Common/NavigationBar";

class CommunityPage extends Component {
  render() {
    return (
      <div>
        <NavigationBarContainer title="Community"/>
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
