import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../common/Header';
import CreateModal from '../Create/CreateModal';
import { AdsEndpoint } from '../../utils/endpoints';
import AdView from './Ads/AdView';
import FeedContainer from '../common/FeedContainer';

const endpoints = [AdsEndpoint];
const itemViews = [(item) => <AdView {...item} />];

const MarketPage = ({ navigation }) => {
  const [adFilters, setAdFilters] = useState({});
  return (
    <View style={styles.container}>
      <Header title="Market" />
      <FeedContainer
        endpoints={endpoints}
        itemViews={itemViews}
        filtersList={[adFilters]}
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
