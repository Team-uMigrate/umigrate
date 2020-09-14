import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { AuthEndpoint } from "../../utils/endpoints";
import AuthContext from "../../contexts/AuthContext";
import Header from "../common/Header";

const MenuPage = () => {
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
    <View style={styles.container}>
      <Header title="Menu" />
      <Text style={styles.title}>Menu Page!</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

export default MenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  title: {
    alignSelf: "center",
    marginTop: "80%",
    paddingBottom: "30%"
  }
});
