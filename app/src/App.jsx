import React from 'react';
import { StatusBar } from 'react-native';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthNavigator from './src/navigators/AuthNavigator';
import { ErrorContextProvider } from './src/contexts/ErrorContext';

// The root React Component
const App = () => {
  return (
    <PaperProvider>
      <AuthContextProvider>
        <ErrorContextProvider>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <AuthNavigator />
        </ErrorContextProvider>
      </AuthContextProvider>
    </PaperProvider>
  );
};

export default App;
