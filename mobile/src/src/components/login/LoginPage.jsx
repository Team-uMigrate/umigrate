import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <Text>Login Page!</Text>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
