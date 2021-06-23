import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/views/Header';
import React from 'react';
import { sharedMessagingNotificationStyles } from '../../stylesheets/messaging/messaging.jsx';

// A screen that renders available messaging rooms
const MessagingScreen = () => {
  return (
    <View style={sharedMessagingNotificationStyles.container}>
      <Header title="Messaging" isMessagingOrCommentsPage={true} />
      <Text style={styles.title}>Messaging Page!</Text>
    </View>
  );
};

export default MessagingScreen;
