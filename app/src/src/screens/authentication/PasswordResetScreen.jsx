import React, { useState, useContext } from 'react';
import { AuthEndpoint } from '../../utils/endpoints';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { routes } from '../../utils/routes';
import ErrorContext from '../../contexts/ErrorContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  const [email, setEmail] = useState(initialState.email);
  const error = useContext(ErrorContext);
  const signInRedirect = () => {
    // Navigate to the login screen
    navigation.navigate(routes.login);
  };

  const emailSentRedirect = () => {
    // Navigate to the password reset email sent screen
    navigation.push(routes.emailSent);
  };

  const handlePasswordReset = async () => {
    try {
      await AuthEndpoint.passwordReset(email);
      emailSentRedirect();
    } catch (err) {
      error.setMessage(err.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          style={styles.imageStyle}
          source={require('../../../assets/templatedRegister.png')}
        />
        <Text style={styles.title}>Forgot your password?</Text>
        <Text style={styles.paragraph}>
          Enter the email address associated with your account.
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
    </KeyboardAwareScrollView>
  );
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
    marginBottom: '5%',
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
