import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../common/Header';
import CreateModal from '../Create/CreateModal';
import { ListingsEndpoint } from '../../utils/endpoints';
import ListingView from './Listings/ListingView';
import FeedContainer from '../common/FeedContainer';
import { useScrollToTop } from '@react-navigation/native';

const endpoints = [ListingsEndpoint];
const itemViews = [(item) => <ListingView {...item} />];

const HousingPage = ({ navigation }) => {
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

export default HousingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
});
