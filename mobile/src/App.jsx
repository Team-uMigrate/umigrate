import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthContextProvider } from './src/contexts/AuthContext';
import AuthNavigator from './src/navigators/AuthNavigator';

const App = () => (
  <PaperProvider>
    <AuthContextProvider>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <AuthNavigator />
    </AuthContextProvider>
  </PaperProvider>
);

export default App;
