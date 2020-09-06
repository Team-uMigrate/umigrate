import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import AuthContext from "../../contexts/AuthContext";

const RegistrationPage = ({navigation}) => {
  const auth = useContext(AuthContext);

  const handleSignUp = () => {

  };

  const signInRedirect = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text>Registration Page!</Text>
      <View>
        <View style={styles.row}>
          <Text>Email: </Text>
          <TextInput
            style={styles.textInput}
          />
        </View>
        <View style={styles.row}>
          <Text>Password: </Text>
          <TextInput
            style={styles.textInput}
          />
        </View>
        <View style={styles.row}>
          <Text>Confirm Password: </Text>
          <TextInput
            style={styles.textInput}
          />
        </View>
      </View>
      <Button title="Sign up!" onPress={handleSignUp} />
      <Button title="Sign in!" onPress={signInRedirect} />
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
    height: 30,
    width: 100,
    borderColor: "#000000",
    borderWidth: 2
  }
});
