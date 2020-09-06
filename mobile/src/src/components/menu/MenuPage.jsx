import React, { useContext } from 'react';
import Axios from "axios";
import { StyleSheet, Text, View, Button } from 'react-native';
import { BASE_URL, LOGOUT_ENDPOINT } from "../../constants/apiEndpoints";
import AuthContext from "../../contexts/AuthContext";

const MenuPage = () => {
  const auth = useContext(AuthContext);

  const handleSignOut = () => {
    Axios.post(BASE_URL + LOGOUT_ENDPOINT)
      .then((response) => {
        auth.setAuthenticated(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Menu Page!</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

export default MenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
