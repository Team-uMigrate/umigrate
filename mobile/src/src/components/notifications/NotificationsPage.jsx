import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NotificationPage = () => {
  return (
    <View style={styles.container}>
      <Text>Notification Page!</Text>
    </View>
  );
};

export default NotificationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
