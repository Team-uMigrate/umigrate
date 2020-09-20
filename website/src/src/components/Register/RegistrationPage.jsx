import React, { useContext } from "react";
import VerificationContainer from "./Verification";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import CreateUserContainer from "./CreateUser";

const RegistrationPage = () => {
  const auth = useContext(AuthContext);

  if (auth.isAuthenticated === true) {
    return (
      <switch>
        <Route path="/register/create-user">
          <CreateUserContainer />
        </Route>
        <Redirect from="/" to="/register/create-user">
          <CreateUserContainer />
        </Redirect>
      </switch>
    );
  } else {
    return (
      <switch>
        <Route path="/register/verification">
          <VerificationContainer />
        </Route>
        <Redirect from="/" to="/register/verification">
          <VerificationContainer />
        </Redirect>
      </switch>
    );
  }
};

export default RegistrationPage;
