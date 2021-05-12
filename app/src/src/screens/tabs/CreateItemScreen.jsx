import React from 'react';
import CreateCommunityScreen from '../createItem/CreateCommunityScreen';
import CreateMarketScreen from '../createItem/CreateMarketScreen';
import CreateHousingScreen from '../createItem/CreateHousingScreen';

// A screen that allows the user to a create shared item
const CreateItemScreen = ({ route }) => {
  switch (route.params.page) {
    case 'Community':
      return <CreateCommunityScreen />;

    case 'Market':
      return <CreateMarketScreen />;

    case 'Housing':
      return <CreateHousingScreen />;

    default:
      return <></>;
  }
};

export default CreateItemScreen;
