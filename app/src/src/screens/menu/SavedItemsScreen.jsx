import React from 'react';
import { Text, View } from 'react-native';
import Header from '../../components/views/Header';
import { Button } from 'react-native-paper';
import { routes } from '../../utils/routes';
import { sharedMenustyles } from '../../stylesheets/menu/menu.jsx';

const SavedItemsScreen = ({ navigation }) => {
  const menuRedirect = () => {
    navigation.navigate(routes.menuHome);
  };

  return (
    <View style={sharedMenustyles.container}>
      <Header title="Saved Posts" />
      <Text style={sharedMenustyles.title}>Saved Posts Page!</Text>
      <Button onPress={menuRedirect}>Back to Menu</Button>
    </View>
  );
};

export default SavedItemsScreen;
