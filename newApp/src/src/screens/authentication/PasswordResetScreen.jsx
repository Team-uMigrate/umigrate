import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Renders the password reset screen.
 * @param {StackNavigationProp} navigation
 * @return {JSX.Element}
 * */
const PasswordResetScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password reset!</Text>
    </View>
  );
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  title: {
    alignSelf: 'center',
    marginTop: '80%',
  },
});
