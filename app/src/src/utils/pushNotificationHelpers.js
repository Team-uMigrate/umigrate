import Constants from 'expo-constants';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { DevicesEndpoint } from './endpoints';
import { setPushToken } from './storageAccess';

export async function registerForPushNotificationsAsync(error) {
  let token;
  // Check the platform that the app is running on
  if (
    Constants.isDevice &&
    (Platform.OS === 'ios' || Platform.OS === 'android')
  ) {
    // Retrieve notification permissions
    let permission = await Notifications.getPermissionsAsync();
    // Request notification permissions if not already granted
    if (!permission.granted) {
      permission = await Notifications.requestPermissionsAsync();
    }
    // Set error message if notification permissions is not granted
    if (!permission.granted) {
      error.setMessage('Failed to get push token for push notification!');
      return;
    }
    // Retrieve token and set it to async storage
    token = (await Notifications.getExpoPushTokenAsync()).data;
    await setPushToken(token);

    // Retrieve devices from Devices endpoint and register current device if not in the devices list
    const devices = (await DevicesEndpoint.list()).data;
    if (!devices.find((d) => d.expo_push_token === token)) {
      await DevicesEndpoint.post(`Device ${devices.length + 1}`, token);
    }
  } else {
    error.setMessage('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
