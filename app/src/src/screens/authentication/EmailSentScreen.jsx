import React from 'react';
import { AuthEndpoint } from '../../utils/endpoints';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { routes } from '../../utils/routes';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Renders the password reset email sent screen
 * @param {StackNavigationProp} navigation
 * @return {JSX.Element}
 * */
const EmailSentScreen = ({ navigation }) => {
  const signInRedirect = () => {
    // Navigate to the login screen
    navigation.push(routes.login);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Reset Email Sent</Text>
      <Text style={styles.paragraph}>
        An email has been sent to the email address provided. {"\n"} {"\n"}
        Follow the directions in the email to reset your password.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonStyle}
          mode="outlined"
          title="Back"
          onPress={signInRedirect}
        >
          Back to sign in
        </Button>
      </View>
    </View>
  );
};

export default EmailSentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    marginTop: '15%',
    fontSize: 23,
    fontWeight: 'bold',
  },
  paragraph: {
    marginRight: '10%',
    marginLeft: '11%',
    marginTop: '6%',
    marginBottom: '4%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
