import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Modal } from "react-native";
import AuthContext from "../../contexts/AuthContext";
import { AuthEndpoint, ProfileEndpoint } from "../../utils/endpoints";

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
          }
        );
      },
      (error) => {
        console.log(error);
        console.log(error.response);

        // Populate error messages
        let errors = [];
        let count = 0;
        // Loops through all error messages in the data of the response field in the error object to generate error messages
        for (let errorType in error.response.data) {
          errors.push(
            <Text key={count}>
              {errorType.substr(0, 1).toUpperCase() + // Capitalize the first letter
                errorType.substring(1) +
                ": " +
                error.response.data[errorType]}
            </Text>
          );
          count++;
        }

        setErrorMessage(errors);
        setModalVisible(true);
      }
    );
  };

  const signUpRedirect = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page!</Text>
      <View>
        <View style={styles.row}>
          <Text>Email: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.row}>
          <Text>Password: </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign in" onPress={handleSignIn} />
        <Button title="Sign up" onPress={signUpRedirect} />
      </View>
      <Modal visible={modalVisible} presentationStyle={"overFullScreen"}>
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text style={{ alignItems: "center" }}>Error:</Text>
            {errorMessage}
            <Button
              title="Close"
              style={styles.buttonContainer}
              onPress={() => setModalVisible(false)}
            ></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: "40%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    width: 200,
    padding: 10,
    borderColor: "#000000",
    borderWidth: 2,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
    marginBottom: "50%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
