import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AuthContext from "../../contexts/AuthContext";

const LoginPage = ({navigation}) => {
  const auth = useContext(AuthContext);

  const handleSignIn = () => {

  };

  const signUpRedirect = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text>Login Page!</Text>
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
      </View>
      <Button title="Sign in!" onPress={handleSignIn} />
      <Button title="Sign up!" onPress={signUpRedirect} />
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
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
