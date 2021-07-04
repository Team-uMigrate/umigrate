import React, { useContext, useState } from 'react';
import { AuthEndpoint } from '../../utils/endpoints';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { routes } from '../../utils/routes';
import ErrorContext from '../../contexts/ErrorContext';
import { StackNavigationProp } from '@react-navigation/stack';

const initialState = {
  /** @type {string | null} */
  email: null,
  /** @type {string | null} */
  password: null,
  /** @type {string | null} */
  confirm: null,
};

/**
 * Renders the registration screen.
 * @param {StackNavigationProp} navigation
 * @return {JSX.Element}
 * */
const RegistrationScreen = ({ navigation }) => {
  const error = useContext(ErrorContext);
  const [email, setEmail] = useState(initialState.email);
  const [password, setPassword] = useState(initialState.password);
  const [confirm, setConfirm] = useState(initialState.confirm);

  const signInRedirect = () => {
    // Navigate to the login screen
    navigation.push(routes.login);
  };

  const handleSignUp = async () => {
    // Try to login and redirect to the login screen if successful or display the error message otherwise
    try {
      await AuthEndpoint.register(email, password, confirm);
      signInRedirect();
    } catch (err) {
      error.setMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../../../assets/templatedRegister.png')}
      />
      <Text style={styles.title}>Get started by registering</Text>
      <View style={styles.inputBoxes}>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            label="uWaterloo Email..."
            onChangeText={(text) => setEmail(text.toLowerCase().trim())}
            autoCompleteType="email"
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            label="Password..."
            onChangeText={(text) => setPassword(text)}
            autoCompleteType="password"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            label="Confirm Password..."
            onChangeText={(text) => setConfirm(text)}
            autoCompleteType="password"
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonStyle}
          mode="contained"
          title="Sign up"
          onPress={handleSignUp}
        >
          Send Email Link
        </Button>
        <Button
          style={styles.buttonStyle}
          mode="outlined"
          title="Back"
          onPress={signInRedirect}
        >
          Back
        </Button>
      </View>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  imageStyle: {
    marginTop: '5%',
    width: '80%',
    height: '35%',
  },
  inputBoxes: {
    marginTop: '10%',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: '10%',
    fontSize: 23,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 50,
    width: 250,
  },
  buttonContainer: {
    marginTop: '5%',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    height: 40,
    width: 250,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
