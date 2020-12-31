import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { Button } from 'react-native-paper';

const CalendarScreen = ({ navigation }) => {
  const menuRedirect = () => {
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <Header title="Calendar" />
      <Text style={styles.title}>Calendar Page!</Text>
      <Button onPress={menuRedirect}>Back to Menu</Button>
    </View>
  );
};

export default CalendarScreen;

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
