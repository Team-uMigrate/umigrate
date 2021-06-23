import React from 'react';
import {  View, Text } from 'react-native';
import {sharedItemstyles} from '../../stylesheets/createItem/createItem.jsx';

const CreateMarketScreen = () => {
  return (
    <View styles={sharedItemstyles}>
      <Text>Create a post in market!</Text>
    </View>
  );
};

export default CreateMarketScreen;
