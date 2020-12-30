import React from 'react';
import CommunityContainer from '../components/Create/CreateCommunity/CommunityContainer';
import MarketContainer from '../components/Create/CreateMarket/MarketContainer';
import HousingContainer from '../components/Create/CreateHousing/HousingContainer';

// A screen that allows the user to create shared items
const CreateItemScreen = ({ route }) => {
  switch (route.params.page) {
    case 'Community':
      return <CommunityContainer />;

    case 'Market':
      return <MarketContainer />;

    case 'Housing':
      return <HousingContainer />;

    default:
      break;
  }
};

export default CreateItemScreen;
