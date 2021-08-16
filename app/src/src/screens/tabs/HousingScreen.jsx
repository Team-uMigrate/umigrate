import { ListingsEndpoint } from '../../utils/endpoints';
import ListingView from '../../components/views/ListingView';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';
import { sharedItemTabsStyles } from '../../stylesheets/tabs/tabs.jsx';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

const fetchItemsList = [
  async (page, filters) => await ListingsEndpoint.list(page, filters),
];
const itemViews = [
  (item, updateItem) => <ListingView item={item} updateItem={updateItem} />,
];

/**
 * Renders the housing screen.
 * @param {StackNavigationProp} navigation
 * @param {RouteProp} route
 * @return {JSX.Element}
 * */
const HousingScreen = ({ navigation, route }) => {
  const [listingFilters, setListingFilters] = useState({});
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={sharedItemTabsStyles.container}>
      <Header title="Housing" />
      <FeedContainer
        fetchItemsList={fetchItemsList}
        itemViews={itemViews}
        filtersList={[listingFilters]}
        scrollRef={ref}
        feedName={route.name}
      />
      <CreateItemModal navigation={navigation} />
    </View>
  );
};

export default HousingScreen;
