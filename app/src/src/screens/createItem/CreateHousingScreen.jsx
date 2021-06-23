import React from 'react';
import { View, Text } from 'react-native';
import { sharedItemStyles } from '../../stylesheets/createItem/createItem.jsx';

const CreateHousingScreen = () => {
  return (
    <View styles={sharedItemStyles}>
      <Text>Create a post in housing!</Text>
    </View>
  );
};

export default CreateHousingScreen;
