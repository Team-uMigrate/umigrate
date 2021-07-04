import React from 'react';
import CreateCommunityScreen from '../createItem/CreateCommunityScreen';
import CreateMarketScreen from '../createItem/CreateMarketScreen';
import CreateHousingScreen from '../createItem/CreateHousingScreen';
import { RouteProp } from '@react-navigation/native';

/**
 * Renders the create item screen.
 * @param {RouteProp} route
 * @return {JSX.Element}
 * */
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
