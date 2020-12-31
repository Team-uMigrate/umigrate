import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/views/Header';
import { Button } from 'react-native-paper';
import { routes } from '../../utils/routes';

const SettingsScreen = ({ navigation }) => {
  const menuRedirect = () => {
    navigation.navigate(routes.menuHome);
  };

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <Text style={styles.title}>Settings Page!</Text>
      <Button onPress={menuRedirect}>Back to Menu</Button>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  title: {
    alignSelf: 'center',
    marginTop: '80%',
  },
});
