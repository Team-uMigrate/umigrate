import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../common/Header';
import CreateModal from '../Create/CreateModal';
import { AdsEndpoint } from '../../utils/endpoints';
import AdView from './Ads/AdView';
import FeedContainer from '../common/FeedContainer';
import { useScrollToTop } from '@react-navigation/native';

const endpoints = [AdsEndpoint];
const itemViews = [(item) => <AdView {...item} />];

const MarketPage = ({ navigation }) => {
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

export default MarketPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
});
