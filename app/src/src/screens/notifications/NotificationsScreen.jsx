import { Text, View } from 'react-native';
import Header from '../../components/views/Header';
import React from 'react';
import { sharedMessagingNotificationStyles } from '../../stylesheets/messaging/messaging.jsx';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Renders the notification screen.
 * @param {StackNavigationProp} navigation
 * @return {JSX.Element}
 * */
const NotificationScreen = ({ navigation }) => {
  return (
    <View style={sharedMessagingNotificationStyles.container}>
      <Header title="Notifications" isNotificationPage={true} />
      <Text style={styles.title}>Notification Page!</Text>
    </View>
  );
};

export default NotificationScreen;
