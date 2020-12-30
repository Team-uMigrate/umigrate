import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/Header';
import React from 'react';

// A screen that renders available messaging rooms
const MessagingScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Messaging" isMessagingOrCommentsPage={true} />
      <Text style={styles.title}>Messaging Page!</Text>
    </View>
  );
};

export default MessagingScreen;

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
