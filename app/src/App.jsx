import React from 'react';
import { StatusBar } from 'react-native';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthNavigator from './src/navigators/AuthNavigator';

// The root React Component
const App = () => {
  return (
    <PaperProvider>
      <AuthContextProvider>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
        <AuthNavigator />
      </AuthContextProvider>
    </PaperProvider>
  );
};

export default App;
