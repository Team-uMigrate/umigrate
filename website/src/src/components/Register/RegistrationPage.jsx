import React, { Component } from "react";
import Verification from "./Verification";
import CreateUser from "./CreateUser";
import { Route, Redirect, Switch} from "react-router-dom";

class RegistrationPage extends Component {
  state = {
    isVerified: false
  };

  setVerified = (isVer) => {
    this.setState({isVerified: isVer})
  };

  render() {
    if(!this.state.isVerified) {
      return (
        <Switch>
          <Route path="/register/verification"><Verification setVer={this.setVerified} /></Route>
          <Redirect from="/register/" to="/register/verification" />
        </Switch>
      )
    }

    else {
      return (
        <Switch>
          <Route path="/register/verification"><Verification setVer={this.setVerified} /></Route>
          <Route path="/register/create-user"><CreateUser /></Route>
          <Redirect from="/register/" to="/register/verification" />
        </Switch>
      )
    }
  }
}

export default RegistrationPage;
