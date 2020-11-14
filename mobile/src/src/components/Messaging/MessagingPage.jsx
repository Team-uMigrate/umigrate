import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../common/Header';

const MessagingPage = () => {
  return (
    <View style={styles.container}>
      <Header title="Messaging" isMessagingPage={true} />
      <Text style={styles.title}>Messaging Page!</Text>
    </View>
  );
};

export default MessagingPage;

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
