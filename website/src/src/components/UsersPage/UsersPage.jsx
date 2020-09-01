import React, { Component } from "react";
import UsersContainer from "./UsersPage/UsersContainer";
import NavigationBarContainer from "../Common/NavigationBar";

class UsersPage extends Component {
  render() {
    return (
      <div>
        <NavigationBarContainer title="Users" />
        <div className="row">
          <div className="col-lg-6">
            <UsersContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default UsersPage;
