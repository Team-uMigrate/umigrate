import { ListingsEndpoint } from '../../utils/endpoints';
import ListingView from '../../components/views/ListingView';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';
import UserViewModal from '../../components/modals/UserViewModal';

const getItemsSet = [
  async (page, filters) => await ListingsEndpoint.list(page, filters),
];
const itemViews = [(item) => <ListingView {...item} />];

// A screen that renders housing shared items
const HousingScreen = ({ navigation, route }) => {
  const [listingFilters, setListingFilters] = useState({});
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <Header title="Housing" />
      <FeedContainer
        getItemsSet={getItemsSet}
        itemViews={itemViews}
        filtersList={[listingFilters]}
        scrollRef={ref}
        feedName={route.name}
      />
      <CreateItemModal navigation={navigation} />
      <UserViewModal navigation={navigation} />
    </View>
  );
};

export default HousingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
});
