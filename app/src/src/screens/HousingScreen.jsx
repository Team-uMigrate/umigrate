import { ListingsEndpoint } from '../utils/endpoints';
import ListingView from '../components/views/ListingView';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import FeedContainer from '../components/containers/FeedContainer';
import CreateModal from '../components/Create/CreateModal';

const endpoints = [ListingsEndpoint];
const itemViews = [(item) => <ListingView {...item} />];

// A screen that renders housing shared items
const HousingScreen = ({ navigation }) => {
  const [listingFilters, setListingFilters] = useState({});
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <Header title="Housing" />
      <FeedContainer
        endpoints={endpoints}
        itemViews={itemViews}
        filtersList={[listingFilters]}
        scrollRef={ref}
      />
      <CreateModal navigation={navigation} />
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
