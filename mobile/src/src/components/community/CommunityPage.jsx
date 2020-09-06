import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CommunityPage = () => {
  return (
    <View style={styles.container}>
      <Text>Community Page!</Text>
    </View>
  );
};

export default CommunityPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
