import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MenuPage = () => {
  return (
    <View style={styles.container}>
      <Text>Menu Page!</Text>
    </View>
  );
};

export default MenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
