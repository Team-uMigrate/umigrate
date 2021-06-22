import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext';
import TabNavigator from './TabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavContextProvider } from '../contexts/TabNavContext';
import { CreateItemContextProvider } from '../contexts/CreateItemContext';
import ErrorContext from '../contexts/ErrorContext';
import LoadingScreen from '../screens/authentication/LoadingScreen';
import { registerForPushNotificationsAsync } from '../utils/pushNotificationHelpers';
import MessagingScreen from '../screens/messaging/MessagingScreen';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegistrationScreen from '../screens/authentication/RegistrationScreen';
import NotificationScreen from '../screens/notifications/NotificationsScreen';
import CommentsScreen from '../screens/comments/CommentsScreen';
import LikesScreen from '../screens/comments/LikesScreen';
import { routes } from '../utils/routes';
import PasswordResetScreen from '../screens/authentication/PasswordResetScreen';

const Stack = createStackNavigator();

// A navigator that renders components depending on the authentication state
const AuthNavigator = () => {
  const auth = useContext(AuthContext);
  const error = useContext(ErrorContext);
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    (async () => {
      // Register for push notifications if authenticated
      if (auth.isAuthenticated) {
        try {
          const token = await registerForPushNotificationsAsync(error);
          setExpoPushToken(token);
        } catch (e) {
          error.setMessage(e.message);
        }
      }
    })();
  }, [auth.isAuthenticated]);

  if (auth.isAuthenticated === true) {
    // Render authenticated view
    return (
      <TabNavContextProvider>
        <CreateItemContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              gestureDirection={'horizontal-inverted'}
            >
              <Stack.Screen name={routes.tabs} component={TabNavigator} />
              <Stack.Screen
                name={routes.messaging}
                component={MessagingScreen}
              />
              <Stack.Screen name={routes.comments} component={CommentsScreen} />
              <Stack.Screen name={routes.likes} component={LikesScreen} />
              <Stack.Screen
                name={routes.notifications}
                options={{
                  gestureDirection: 'horizontal-inverted',
                }}
                component={NotificationScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CreateItemContextProvider>
      </TabNavContextProvider>
    );
  } else if (auth.isAuthenticated === false) {
    // Render not authenticated view
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={routes.login} component={LoginScreen} />
          <Stack.Screen
            name={routes.registration}
            component={RegistrationScreen}
          />
          <Stack.Screen
            name={routes.passwordReset}
            component={PasswordResetScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    // Render loading view
    return <LoadingScreen />;
  }
};

export default AuthNavigator;
