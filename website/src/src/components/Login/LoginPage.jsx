import React, { useContext } from "react";
import LoginContainer from "./Login";
import AuthContext from "../../contexts/AuthContext";
import { Redirect, Route } from "react-router-dom";

const LoginPage = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      {auth.isAuthenticated ? (
        <Redirect to="/register/create-user" />
      ) : (
        <Route path="/login">
          <LoginContainer />
        </Route>
      )}
    </div>
  );
};

export default LoginPage;
