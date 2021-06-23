import { Text, View } from 'react-native';
import Header from '../../components/views/Header';
import React from 'react';
import {styles} from '../../stylesheets/messaging/messaging.jsx';

// A screen that renders notifications
const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Notifications" isNotificationPage={true} />
      <Text style={styles.title}>Notification Page!</Text>
    </View>
  );
};

export default NotificationScreen;

