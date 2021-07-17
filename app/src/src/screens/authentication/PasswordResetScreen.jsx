import React, { useContext, useState } from 'react';
import { AuthEndpoint } from '../../utils/endpoints';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { routes } from '../../contexts/ErrorContext';
//import ErrorContext from '../../contexts/ErrorContext'
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

const initialState = {
  /** @type {string | null} */
  email: null,
};

/**
 * Renders the password reset screen.
 * @param {StackNavigationProp} navigation
 * @return {JSX.Element}
 * */
const PasswordResetScreen = ({ navigation }) => {
  //const auth = useContext(AuthContext);
  //const error = useContext(ErrorContext);
  const [email, setEmail] = useState(initialState.email);

  const signInRedirect = () => {
    // Navigate to the login screen
    navigation.push(routes.login);
  };

  // if user enters an invalid email, should redirect to the password reset page
  const handlePasswordReset = async () => {
    // Try to reset password with email and redirect to the password reset screen
    // if successful (email is correct) or display error message otherwise
    async.preventDefault();

    const data = {
      email: this.email,
    };

    axios
      .post('forgot', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    try {
      await AuthEndpoint.passwordReset(email);
      await ProfileEndpoint.get();
      auth.setIsAuthenticated(true);
      passwordResetRedirect();
    } catch (err) {
      error.setMessage(err.message);

      return (
        <View style={styles.container}>
          <Image
            style={styles.imageStyle}
            source={require('../../../assets/templatedRegister.png')}
          />
          <Text style={styles.title}>Forgot your password?</Text>
          <Text style={styles.paragraph}>
            Enter your email for a password reset link
          </Text>
          <View style={styles.inputBoxes}>
            <View style={styles.row}>
              <TextInput
                style={styles.textInput}
                label="uWaterloo email..."
                onChangeText={(text) => setEmail(text.toLowerCase().trim())}
                autoCompleteType="email"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.buttonStyle}
              mode="contained"
              title="Password reset"
              onPress={handlePasswordReset}
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
    }
  };
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  imageStyle: {
    marginTop: '5%',
    width: '80%',
    height: '35%',
    borderRadius: 11,
  },
  inputBoxes: {
    marginTop: '3%',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: '10%',
    marginBottom: '6%',
    fontSize: 23,
    fontWeight: 'bold',
  },
  paragraph: {
    marginBottom: '5%',
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
    marginBottom: '2%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5b38a6',
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
