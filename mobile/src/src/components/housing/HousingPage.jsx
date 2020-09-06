import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HousingPage = () => {
  return (
    <View style={styles.container}>
      <Text>Housing Page!</Text>
    </View>
  );
};

export default HousingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
