import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthRouter from "../routers/AuthRouter";
import { AuthContextProvider } from "../contexts/AuthContext";

const App = () =>
  <AuthContextProvider>
    <AuthRouter />
  </AuthContextProvider>
;

export default App;
