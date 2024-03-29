import React, { useContext, useEffect } from 'react';
import { ProfileEndpoint } from '../../utils/endpoints';
import AuthContext from '../../contexts/AuthContext';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
} from '../../utils/storageAccess';

/**
 * Renders the loading screen.
 * @return {JSX.Element}
 * */
const LoadingScreen = () => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const token = await getAuthToken();

      // Make request to Profile endpoint and set isAuthenticated to true if successful or false otherwise
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
  }, [auth.isAuthenticated]);

  return (
    <View style={styles.waitContainer}>
      <Text>Please Wait</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  waitContainer: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
