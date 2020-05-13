import React, { Component } from "react";
import UsersContainer from "./UsersPage/UsersContainer";
import MenuBar from "../Common/MenuBar";

class UsersPage extends Component {
  render() {
    return (
      <div>
        <MenuBar type = "users"/>
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
