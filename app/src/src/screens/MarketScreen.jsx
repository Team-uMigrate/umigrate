import { AdsEndpoint } from '../utils/endpoints';
import AdView from '../components/views/AdView';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Header from '../components/common/Header';
import FeedContainer from '../components/common/FeedContainer';
import CreateModal from '../components/Create/CreateModal';

const endpoints = [AdsEndpoint];
const itemViews = [(item) => <AdView {...item} />];

// A screen that renders market shared items
const MarketScreen = ({ navigation }) => {
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
      />
      <CreateModal navigation={navigation} />
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
