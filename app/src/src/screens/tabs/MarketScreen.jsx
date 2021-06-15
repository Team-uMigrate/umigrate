import { AdsEndpoint } from '../../utils/endpoints';
import AdView from '../../components/views/AdView';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';

const endpoints = [AdsEndpoint];
const itemViews = [(item) => <AdView {...item} />];

// A screen that renders market shared items
const MarketScreen = ({ navigation, route }) => {
  const [adFilters, setAdFilters] = useState({});
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <Header title="Market" />
      <FeedContainer
        endpoints={endpoints}
        itemViews={itemViews}
        filtersList={[adFilters]}
        scrollRef={ref}
        route={route}
      />
      <CreateItemModal navigation={navigation} />
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
});
