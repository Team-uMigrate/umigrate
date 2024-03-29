import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from '../contexts/AuthContext';
import TabNavigator from './TabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { StackNavContextProvider } from '../contexts/StackNavContext';
import { CreateItemContextProvider } from '../contexts/CreateItemContext';
import ErrorContext from '../contexts/ErrorContext';
import LoadingScreen from '../screens/authentication/LoadingScreen';
import { registerForPushNotificationsAsync } from '../utils/pushNotificationHelpers';
import MessagingScreen from '../screens/messaging/MessagingScreen';
import LoginScreen from '../screens/authentication/LoginScreen';
import RegistrationScreen from '../screens/authentication/RegistrationScreen';
import NotificationScreen from '../screens/notifications/NotificationsScreen';
import CommentsScreen from '../screens/comments/CommentsScreen';
import LikesScreen from '../screens/likes/LikesScreen';
import { routes } from '../utils/routes';
import PasswordResetScreen from '../screens/authentication/PasswordResetScreen';
import { UserViewContextProvider } from '../contexts/UserViewContext';
import SearchScreen from '../screens/search/SearchScreen';
import EmailSentScreen from '../screens/authentication/EmailSentScreen';

const initialState = {
  /** @type {string | null} */
  expoPushToken: null,
};

const Stack = createStackNavigator();

/**
 * Renders screens based on the authentication state.
 * @return {JSX.Element}
 */
const AuthNavigator = () => {
  const auth = useContext(AuthContext);
  const error = useContext(ErrorContext);
  const [expoPushToken, setExpoPushToken] = useState(
    initialState.expoPushToken
  );

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
    // Render authenticated screens
    return (
      <StackNavContextProvider>
        <UserViewContextProvider>
          <CreateItemContextProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                gestureDirection={'horizontal-inverted'}
              >
                <Stack.Screen name={routes.tabs} component={TabNavigator} />
                <Stack.Screen
                  name={routes.comments}
                  component={CommentsScreen}
                />
                <Stack.Screen name={routes.likes} component={LikesScreen} />
                <Stack.Screen name={routes.search} component={SearchScreen} />
                <Stack.Screen
                  name={routes.messaging}
                  component={MessagingScreen}
                />
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
        </UserViewContextProvider>
      </StackNavContextProvider>
    );
  } else if (auth.isAuthenticated === false) {
    // Render unauthenticated screens
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={routes.login} component={LoginScreen} />
          <Stack.Screen
            name={routes.registration}
            component={RegistrationScreen}
          />
          <Stack.Screen
            name={routes.resetPassword}
            component={PasswordResetScreen}
          />
          <Stack.Screen name={routes.emailSent} component={EmailSentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    // Render loading screen
    return <LoadingScreen />;
  }
};

export default AuthNavigator;
