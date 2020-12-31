import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/views/Header';
import React from 'react';

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
