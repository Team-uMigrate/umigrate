import React from 'react';
import { View, Text } from 'react-native';
import { sharedItemStyles } from '../../stylesheets/createItem/createItem.jsx';

const CreateMarketScreen = () => {
  return (
    <View styles={sharedItemStyles}>
      <Text>Create a post in market!</Text>
    </View>
  );
};

export default CreateMarketScreen;
