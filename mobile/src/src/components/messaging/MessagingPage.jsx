import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MessagingPage = () => {
  return (
    <View style={styles.container}>
      <Text>Messaging Page!</Text>
    </View>
  );
};

export default MessagingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
