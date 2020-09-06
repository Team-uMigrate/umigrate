import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RegistrationPage = () => {
  return (
    <View style={styles.container}>
      <Text>Registration Page!</Text>
    </View>
  );
};

export default RegistrationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
