import React from 'react';
import CreateCommunityItems from '../../components/containers/CreateCommunityItems';
import CreateMarketItems from '../../components/containers/CreateMarketItems';
import CreateHousingItems from '../../components/containers/CreateHousingItems';

// A screen that allows the user to a create shared item
const CreateItemScreen = ({ route }) => {
  switch (route.params.page) {
    case 'Community':
      return <CreateCommunityItems />;

    case 'Market':
      return <CreateMarketItems />;

    case 'Housing':
      return <CreateHousingItems />;

    default:
      return <></>;
  }
};

export default CreateItemScreen;
