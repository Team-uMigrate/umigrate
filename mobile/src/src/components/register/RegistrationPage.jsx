import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import AuthContext from "../../contexts/AuthContext";
import Axios from "axios";
import { BASE_URL, REGISTER_ENDPOINT } from "../../constants/apiEndpoints";

const RegistrationPage = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();

  const signInRedirect = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    Axios.post(BASE_URL + REGISTER_ENDPOINT, {email, password, confirm})
      .then((response) => {
        // Set authentication token to the header
        signInRedirect();
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Registration Page!</Text>
      <View>
        <View style={styles.row}>
          <Text>Email: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={styles.row}>
          <Text>Password: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.row}>
          <Text>Confirm Password: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setConfirm(text)}
          />
        </View>
      </View>
      <Button title="Sign up" onPress={handleSignUp} />
      <Button title="Sign in" onPress={signInRedirect} />
    </View>
  );
};

export default RegistrationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  textInput: {
    height: 40,
    width: 200,
    padding: 10,
    borderColor: "#000000",
    borderWidth: 2
  }
});
