import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AdsPage from "../components/Advertisements";
import SettingsPage from "../components/UserSettings";
import CommunityPage from "../components/Community";
import HousingPage from "../components/Housing";
import MessagingPage from "../components/Messaging";
import LoginPage from "../components/Login";
import RegistrationPage from "../components/Register";
import UsersPage from "../components/UsersPage";
import AuthContext from "../contexts/AuthContext";

class AuthRouter extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated } = this.context;

    if(isAuthenticated === true) {
      return (
        <Router>
          <Switch>
            <Route path="/advertisements"><AdsPage /></Route>
            <Route path="/community"><CommunityPage /></Route>
            <Route path="/housing"><HousingPage /></Route>
            <Route path="/settings"><SettingsPage /></Route>
            <Route path="/messaging"><MessagingPage /></Route>
            <Route path="/users"><UsersPage /></Route>
            <Redirect from="/" to="/community" />
          </Switch>
        </Router>
      )
    }

    else if(isAuthenticated === false) {
      return (
        <Router>
          <Switch>
            <Route path="/login"><LoginPage /></Route>
            <Route path="/register"><RegistrationPage /></Route>
            <Redirect from="/" to="/login" />;
          </Switch>
        </Router>
      )
    }

    else {
      return (
        <h1>Please Wait.....</h1>
      )
    }
  }
}

export default AuthRouter;
