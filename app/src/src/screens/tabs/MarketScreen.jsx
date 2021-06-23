import { AdsEndpoint } from '../../utils/endpoints';
import AdView from '../../components/views/AdView';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';
import { sharedItemTabsStyles } from '../../stylesheets/tabs/tabs.jsx';

const getItemsSet = [
  async (page, filters) => await AdsEndpoint.list(page, filters),
];
const itemViews = [(item) => <AdView {...item} />];

// A screen that renders market shared items
const MarketScreen = ({ navigation, route }) => {
  const [adFilters, setAdFilters] = useState({});
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={sharedItemTabsStyles.container}>
      <Header title="Market" />
      <FeedContainer
        getItemsSet={getItemsSet}
        itemViews={itemViews}
        filtersList={[adFilters]}
        scrollRef={ref}
        feedName={route.name}
      />
      <CreateItemModal navigation={navigation} />
    </View>
  );
};

export default MarketScreen;
