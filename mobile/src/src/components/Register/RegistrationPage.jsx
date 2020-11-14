import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Modal, Image,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthEndpoint } from '../../utils/endpoints';

const RegistrationPage = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const signInRedirect = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    AuthEndpoint.register(
      { email, password1: password, password2: confirm },
      (response) => signInRedirect(),
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
            secureTextEntry
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            label="Confirm Password..."
            onChangeText={(text) => setConfirm(text)}
            autoCompleteType="password"
            secureTextEntry
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
      <Modal visible={modalVisible} presentationStyle="overFullScreen">
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={{ alignItems: 'center' }}>Error:</Text>
            {errorMessage}
            <Button
              title="Close"
              style={styles.buttonContainer}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RegistrationPage;

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
