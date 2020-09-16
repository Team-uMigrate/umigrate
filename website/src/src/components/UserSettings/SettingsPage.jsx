import React, { Component } from "react";
import AccountContainer from "./Account";
import BlockingContainer from "./Blocking";
import DevicesContainer from "./Devices";
import DisplayAndThemeContainer from "./DisplayAndTheme";
import LanguageAndRegionContainer from "./LanguageAndRegion";
import LocationContainer from "./Location";
import NotificationsContainer from "./Notifications";
import PasswordContainer from "./Password";
import ProfileContainer from "./Profile";
import { Route, Switch, Redirect } from "react-router-dom";
import SettingsSidebar from "./Common/SettingsBar";
import NavigationBarContainer from "../Common/NavigationBar";

class SettingsPage extends Component {
  render() {
    return (
      <div>
        <NavigationBarContainer title="Settings" />
        <SettingsSidebar />
        <Switch>
          <Route path="/settings/account">
            <AccountContainer />
          </Route>
          <Route path="/settings/blocking">
            <BlockingContainer />
          </Route>
          <Route path="/settings/devices">
            <DevicesContainer />
          </Route>
          <Route path="/settings/display-and-theme">
            <DisplayAndThemeContainer />
          </Route>
          <Route path="/settings/language-and-region">
            <LanguageAndRegionContainer />
          </Route>
          <Route path="/settings/location">
            <LocationContainer />
          </Route>
          <Route path="/settings/notifications">
            <NotificationsContainer />
          </Route>
          <Route path="/settings/password">
            <PasswordContainer />
          </Route>
          <Route path="/settings/profile">
            <ProfileContainer />
          </Route>
          <Redirect from="/settings/" to="/settings/account" />;
        </Switch>
      </div>
    );
  }
}

export default SettingsPage;
