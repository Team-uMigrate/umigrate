import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MarketPage = () => {
  return (
    <View style={styles.container}>
      <Text>Market Page!</Text>
    </View>
  );
};

export default MarketPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
