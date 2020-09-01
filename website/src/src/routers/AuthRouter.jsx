import React, { useContext } from "react";
import { Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import MarketPage from "../components/Market";
import SettingsPage from "../components/UserSettings";
import CommunityPage from "../components/Community";
import HousingPage from "../components/Housing";
import MessagingPage from "../components/Messaging";
import LoginPage from "../components/Login";
import RegistrationPage from "../components/Register";
import UsersPage from "../components/UsersPage";
import AuthContext from "../contexts/AuthContext";
import { RoomContextProvider } from "../contexts/RoomContext";

// Maps pages to url paths and restricts access to pages depending on the isAuthenticated and isRegistered states
const AuthRouter = () => {
  const auth = useContext(AuthContext);

  if(auth.isRegistered === true) {
    return (
      <Router>
        <Switch>
          <Route path="/market"><MarketPage /></Route>
          <Route path="/community"><CommunityPage /></Route>
          <Route path="/housing"><HousingPage /></Route>
          <Route path="/settings"><SettingsPage /></Route>
          <Route path="/messaging">
            <RoomContextProvider>
              <MessagingPage />
            </RoomContextProvider></Route>
          <Route path="/users"><UsersPage /></Route>
          // Todo: Set default page back to community
          <Redirect from="/" to="/market" />
        </Switch>
      </Router>
    );
  }

  else if(auth.isRegistered === false) {
    return (
      <Router>
        <Switch>
          <Route path="/login"><LoginPage /></Route>
          <Route path="/register"><RegistrationPage /></Route>
          <Redirect from="/" to="/login" />;
        </Switch>
      </Router>
    );
  }

  else {
    return (
      <h1>Please Wait.....</h1>
    );
  }
};

export default AuthRouter;
