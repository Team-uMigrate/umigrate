import React from "react";
import { StatusBar } from "react-native"
import { AuthContextProvider } from "./src/contexts/AuthContext";
import AuthNavigator from "./src/navigators/AuthNavigator";

const App = () => {
  return (
    <AuthContextProvider>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content"/>
      <AuthNavigator />
    </AuthContextProvider>
  );
};

export default App;
