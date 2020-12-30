import React, { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { AuthEndpoint, ProfileEndpoint } from '../utils/endpoints';
import { Button, Text, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image, Modal, StyleSheet, View } from 'react-native';

// A screen that allows the user to log in with their credentials
const LoginScreen = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Todo: Wrap these functions in a react hook

  const signUpRedirect = () => {
    navigation.navigate('Register');
  };

  const handleSignIn = async () => {
    try {
      await AuthEndpoint.login(email, password);
      await ProfileEndpoint.get();
      auth.setIsAuthenticated(true);
    } catch (error) {
      // Populate error messages
      let errors = [];
      let count = 0;
      // Loops through all error messages in the data of the response field in the error object to generate error messages
      for (let errorType in error.response.data) {
        errors.push(
          <Text key={count}>
            {errorType.substr(0, 1).toUpperCase() + // Capitalize the first letter
              errorType.substring(1) +
              ': ' +
              error.response.data[errorType]}
          </Text>
        );
        count++;
      }

      setErrorMessage(errors);
      setModalVisible(true);
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
              style={styles.textInput}
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
        </View>
        <Modal visible={modalVisible} presentationStyle={'overFullScreen'}>
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Text style={styles.errorText}>Error:</Text>
              {errorMessage}
              <Button
                mode="contained"
                title="Close"
                style={styles.buttonContainer}
                onPress={() => setModalVisible(false)}
              ></Button>
            </View>
          </View>
        </Modal>
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
