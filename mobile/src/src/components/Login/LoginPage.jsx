import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Text, Button } from 'react-native-paper';
import AuthContext from '../../contexts/AuthContext';
import { AuthEndpoint, ProfileEndpoint } from '../../utils/endpoints';

const LoginPage = ({ navigation }) => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignIn = () => {
    AuthEndpoint.login(
      { email, password },
      (response) => {
        ProfileEndpoint.get(
          (response) => auth.setAuthenticated(true),
          (error) => {
            console.log(error);
            console.log(error.response);
          },
        );
      },
      (error) => {
        console.log(error);
        console.log(error.response);

        // Populate error messages
        const errors = [];
        let count = 0;
        // Loops through all error messages in the data of the response field in the error object to generate error messages
        for (const errorType in error.response.data) {
          errors.push(
            <Text key={count}>
              {`${errorType.substr(0, 1).toUpperCase() // Capitalize the first letter
                + errorType.substring(1)
              }: ${
                error.response.data[errorType]}`}
            </Text>,
          );
          count++;
        }

        setErrorMessage(errors);
        setModalVisible(true);
      },
    );
  };

  const signUpRedirect = () => {
    navigation.navigate('Register');
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
              secureTextEntry
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            compact
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
            compact
            style={styles.buttonStyle}
            mode="outlined"
            title="Sign up"
            onPress={signUpRedirect}
          >
            Register
          </Button>
        </View>
        <Modal visible={modalVisible} presentationStyle="overFullScreen">
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Text style={styles.errorText}>Error:</Text>
              {errorMessage}
              <Button
                mode="contained"
                title="Close"
                style={styles.buttonContainer}
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginPage;

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
