import React, { useContext, useState } from 'react';
import { AuthEndpoint } from '../../utils/endpoints';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { routes } from '../../utils/routes';
import ErrorContext from '../../contexts/ErrorContext';

// A screen that allows the user to register with their credentials
const RegistrationScreen = ({ navigation }) => {
  const error = useContext(ErrorContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();

  const signInRedirect = () => {
    navigation.navigate(routes.login);
  };

  const handleSignUp = async () => {
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
