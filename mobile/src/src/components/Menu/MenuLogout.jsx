import React, { useContext } from "react";
import { IconButton } from "react-native-paper";
import { AuthEndpoint } from "../../utils/endpoints";
import AuthContext from "../../contexts/AuthContext";

const MenuLogout = () => {
  const auth = useContext(AuthContext);

  const handleSignOut = () => {
    AuthEndpoint.logout(
      (response) => auth.setAuthenticated(false),
      (error) => {
        console.log(error);
        console.log(error.response);
      }
    );
  };

  return (
    <IconButton
      icon="logout"
      size={70}
      style={{ alignSelf: "center", marginBottom: "-15%" }}
      onPress={handleSignOut}
    />
  );
};

export default MenuLogout;
