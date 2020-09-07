import React, { useContext } from 'react';
import Axios from "axios";
import { StyleSheet, Text, View, Button } from 'react-native';
import { BASE_URL, LOGOUT_ENDPOINT } from "../../constants/apiEndpoints";
import AuthContext from "../../contexts/AuthContext";
import Header from "../common/Header";

const MenuPage = () => {
  const auth = useContext(AuthContext);

  const handleSignOut = () => {
    Axios.post(BASE_URL + LOGOUT_ENDPOINT)
      .then(() => {
        auth.setAuthenticated(false);
      });
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
