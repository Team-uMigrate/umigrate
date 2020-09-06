import React from "react";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import AuthNavigator from "./src/navigators/AuthNavigator";

const App = () => {
  return (
    <AuthContextProvider>
      <AuthNavigator />
    </AuthContextProvider>
  );
};

export default App;
