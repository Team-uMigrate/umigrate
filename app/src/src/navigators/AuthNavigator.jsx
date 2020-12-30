import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import AuthContext from '../contexts/AuthContext';
import TabNavigator from './TabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../components/Login';
import RegistrationPage from '../components/Register';
import MessagingPage from '../components/Messaging';
import { NavContextProvider } from '../contexts/NavContext';
import CommentsContainer from '../components/common/Comments/CommentsContainer';
import NotificationPage from '../components/Notifications/NotificationsPage';
import { CreateItemContextProvider } from '../contexts/CreateItemContext';
import ErrorContext from '../contexts/ErrorContext';
import LoadingScreen from '../screens/LoadingScreen';
import { registerForPushNotificationsAsync } from '../utils/pushNotificationHelpers';

const Stack = createStackNavigator();

// A navigator that renders components depending on authentication state
const AuthNavigator = () => {
  const auth = useContext(AuthContext);
  const error = useContext(ErrorContext);
  const [expoPushToken, setExpoPushToken] = useState(undefined);

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
      <NavContextProvider>
        <CreateItemContextProvider>
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
        </CreateItemContextProvider>
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
    return <LoadingScreen />;
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
