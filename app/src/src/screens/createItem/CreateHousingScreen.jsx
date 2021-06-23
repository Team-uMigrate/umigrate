import React from 'react';
import { View, Text } from 'react-native';
import {sharedItemstyles} from '../../stylesheets/createItem/createItem.jsx';

const CreateHousingScreen = () => {
  return (
    <View styles={sharedItemstyles}>
      <Text>Create a post in housing!</Text>
    </View>
  );
};


export default CreateHousingScreen;
