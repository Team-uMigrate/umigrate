import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const CreateHousingScreen = () => {
  return (
    <View styles={styles}>
      <Text>Create a post in housing!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
});

export default CreateHousingScreen;
