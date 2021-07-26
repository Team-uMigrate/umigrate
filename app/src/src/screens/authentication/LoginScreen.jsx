import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { AuthEndpoint, ProfileEndpoint } from '../../utils/endpoints';
import { Button, Text, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image, StyleSheet, View } from 'react-native';
import { routes } from '../../utils/routes';
import ErrorContext from '../../contexts/ErrorContext';
import { StackNavigationProp } from '@react-navigation/stack';

const initialState = {
  /** @type {string | null} */
  email: null,
  /** @type {string | null} */
  password: null,
};

/**
 * Renders the login screen.
 * @param {StackNavigationProp} navigation
 * @return {JSX.Element}
 * */
const LoginScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const error = useContext(ErrorContext);
  const [email, setEmail] = useState(initialState.email);
  const [password, setPassword] = useState(initialState.password);

  const signUpRedirect = () => {
    // Navigate to the registration screen
    navigation.push(routes.registration);
  };

  const passwordResetRedirect = () => {
    // Navigate to the password reset screen
    navigation.push(routes.resetPassword);
  };

  const handleSignIn = async () => {
    // Try to login and set isAuthenticated to true if successful or false otherwise
    try {
      await AuthEndpoint.login(email, password);
      await ProfileEndpoint.get();
      auth.setIsAuthenticated(true);
    } catch (err) {
      error.setMessage(err.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.imageStyle}
            source={require('../../../assets/templatedLogin.png')}
          />
        </View>
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
        </View>
        <View style={styles.row}>
          <Text 
            style={styles.forgotPassword}
            onPress={passwordResetRedirect}
          >
            Forgot password?
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            compact={true}
            style={styles.buttonStyle}
            mode="contained"
            title="Sign in"
            onPress={handleSignIn}
          >
            Login
          </Button>
          <Button
            compact={true}
            style={styles.buttonStyle}
            mode="outlined"
            title="Sign up"
            onPress={signUpRedirect}
          >
            Register
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  imageStyle: {
    marginTop: '5%',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#3D8BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBoxes: {
    marginTop: '15%',
  },
  textInput: {
    height: 50,
    width: 250,
  },
  divider: {
    marginTop: '5%',
    marginBottom: '5%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
  },
  buttonStyle: {
    height: 40,
    width: 250,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5b38a6',
    marginBottom: '2%',
  },
  errorText: {
    alignItems: 'center',
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
