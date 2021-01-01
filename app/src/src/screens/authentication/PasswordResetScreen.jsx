// A screen that renders notifications
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// A screen that allows the user to reset their password
const PasswordResetScreen = () => {
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
