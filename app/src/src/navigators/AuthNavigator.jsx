import React, { useState, useEffect, useContext } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';
import AuthContext from '../contexts/AuthContext';
import TabNavigator from './TabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../components/Login';
import RegistrationPage from '../components/Register';
import MessagingPage from '../components/Messaging';
import { NavContextProvider } from '../contexts/NavContext';
import CommentsContainer from '../components/common/Comments/CommentsContainer';
import NotificationPage from '../components/Notifications/NotificationsPage';
import { ModalContextProvider } from '../contexts/ModalContext';
import { DevicesEndpoint, setPushToken } from '../utils/endpoints';
import ErrorContext from "../contexts/ErrorContext";

const Stack = createStackNavigator();

// A navigator that renders components depending on authentication state
const AuthNavigator = () => {
  const auth = useContext(AuthContext);
  const error = useContext(ErrorContext)
  const [expoPushToken, setExpoPushToken] = useState(undefined);

  useEffect(() => {
    (async () => {
      if (auth.isAuthenticated) {
        try {
          const token = await registerForPushNotificationsAsync(error);
          setExpoPushToken(token);
        }
        catch (e) {
          error.setMessage(e.message);
        }
      }
    })();
  }, [auth.isAuthenticated]);

  if (auth.isAuthenticated === true) {
    // Render authenticated view
    return (
      <NavContextProvider>
        <ModalContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              gestureDirection={'horizontal-inverted'}
            >
              <Stack.Screen name="Tabs" component={TabNavigator} />
              <Stack.Screen name="Messaging" component={MessagingPage} />
              <Stack.Screen name="Comments" component={CommentsContainer} />
              <Stack.Screen
                name="Notifications"
                options={{
                  gestureDirection: 'horizontal-inverted',
                }}
                component={NotificationPage}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ModalContextProvider>
      </NavContextProvider>
    );
  } else if (auth.isAuthenticated === false) {
    // Render not authenticated view
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={RegistrationPage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    // Render loading view
    return (
      // Todo: Make a loading screen component
      <View style={styles.waitContainer}>
        <Text>Please Wait</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default AuthNavigator;

const styles = StyleSheet.create({
  tabNavigator: {
    backgroundColor: '#ffffff',
  },
  waitContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const registerForPushNotificationsAsync = async (error) => {
  let token;
  // Check the platform that the app is running on
  if (
    Constants.isDevice &&
    (Platform.OS === 'ios' || Platform.OS === 'android')
  ) {
    // Retrieve notification permissions
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    // Request notification permissions if not already granted
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // Set error message if notification permissions is not granted
    if (finalStatus !== 'granted') {
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
};
