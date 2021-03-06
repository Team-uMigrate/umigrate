import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { AuthEndpoint, ProfileEndpoint } from '../../utils/endpoints';
import { Button, Text, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image, Modal, StyleSheet, View } from 'react-native';
import { routes } from '../../utils/routes';
import ErrorContext from '../../contexts/ErrorContext';

// A screen that allows the user to log in with their credentials
const LoginScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const error = useContext(ErrorContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signUpRedirect = () => {
    navigation.navigate(routes.registration);
  };

  const passwordResetRedirect = () => {
    navigation.navigate(routes.passwordReset);
  };

  const handleSignIn = async () => {
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
              label="uWaterloo Email"
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
          <View style={styles.divider}>
            <Text>or</Text>
          </View>
          <Button
            compact={true}
            style={styles.buttonStyle}
            mode="outlined"
            title="Sign up"
            onPress={signUpRedirect}
          >
            Register
          </Button>
          <View style={styles.divider}>
            <Text>or</Text>
          </View>
          <Button
            compact={true}
            style={styles.buttonStyle}
            mode="outlined"
            title="Sign up"
            onPress={passwordResetRedirect}
          >
            Reset password
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
