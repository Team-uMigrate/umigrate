import { AdsEndpoint } from '../../utils/endpoints';
import AdView from '../../components/views/AdView';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';
import UserViewModal from '../../components/modals/UserViewModal';
import { sharedItemTabsStyles } from '../../stylesheets/tabs/tabs.jsx';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

const fetchItemsList = [
  async (page, filters) => await AdsEndpoint.list(page, filters),
];
const itemViews = [
  (item, updateItem) => <AdView item={item} updateItem={updateItem} />,
];

/**
 * Renders the market screen.
 * @param {StackNavigationProp} navigation
 * @param {RouteProp} route
 * @return {JSX.Element}
 * */
const MarketScreen = ({ navigation, route }) => {
  const [adFilters, setAdFilters] = useState({});
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={sharedItemTabsStyles.container}>
      <Header title="Market" />
      <FeedContainer
        fetchItemsList={fetchItemsList}
        itemViews={itemViews}
        filtersList={[adFilters]}
        scrollRef={ref}
        feedName={route.name}
      />
      <CreateItemModal navigation={navigation} />
      <UserViewModal navigation={navigation} />
    </View>
  );
};

export default MarketScreen;
