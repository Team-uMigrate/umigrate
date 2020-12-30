import React, { useContext, useEffect } from 'react';
import {
  getAuthToken,
  ProfileEndpoint,
  removeAuthToken,
  setAuthToken,
} from '../utils/endpoints';
import AuthContext from '../contexts/AuthContext';
import { ActivityIndicator, Text, View } from 'react-native';

// A screen that shows the loading view
const LoadingScreen = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const token = await getAuthToken();

      // Make request to Profile endpoint and set isAuthenticated to true if successful and false otherwise
      if (token != null) {
        await setAuthToken(token);
        try {
          await ProfileEndpoint.get();
          auth.setIsAuthenticated(true);
        } catch (error) {
          await removeAuthToken();
          auth.setIsAuthenticated(false);
        }
      } else auth.setIsAuthenticated(false);
    })();
  });

  return (
    <View style={styles.waitContainer}>
      <Text>Please Wait</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
