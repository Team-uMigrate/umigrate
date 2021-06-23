import React from 'react';
import { Text, View } from 'react-native';
import Header from '../../components/views/Header';
import { Button } from 'react-native-paper';
import { routes } from '../../utils/routes';
import { sharedMenustyles } from '../../stylesheets/menu/menu.jsx';

const CalendarScreen = ({ navigation }) => {
  const menuRedirect = () => {
    navigation.navigate(routes.menuHome);
  };

  return (
    <View style={sharedMenustyles.container}>
      <Header title="Calendar" />
      <Text style={sharedMenustyles.title}>Calendar Page!</Text>
      <Button onPress={menuRedirect}>Back to Menu</Button>
    </View>
  );
};

export default CalendarScreen;
