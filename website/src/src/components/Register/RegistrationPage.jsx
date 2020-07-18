import React, { useContext } from "react";
import VerificationContainer from "./Verification";
import CreateUser from "./CreateUser";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const RegistrationPage = () => {
  const auth = useContext(AuthContext);

  if (auth.isAuthenticated === true) {
    return (
      <switch>
        <Route path="/register/create-user"><CreateUser /></Route>
        <Redirect from="/" to="/register/create-user"><CreateUser /></Redirect>
      </switch>
    )
  }

  else {
    return (
      <switch>
        <Route path="/register/verification"><VerificationContainer /></Route>
        <Redirect from="/" to="/register/verification"><VerificationContainer /></Redirect>
      </switch>
    )
  }
};

export default RegistrationPage;
