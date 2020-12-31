import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { Button } from 'react-native-paper';

const SettingsScreen = ({ navigation }) => {
  const menuRedirect = () => {
    navigation.navigate('Menu');
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
