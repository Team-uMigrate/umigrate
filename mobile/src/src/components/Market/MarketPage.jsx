import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../common/Header';
import AdsContainer from './Ads/AdsContainer';
import CreateModal from '../Create/CreateModal';

const MarketPage = ({ navigation }) => (
  <View style={styles.container}>
    <Header title="Market" />
    <AdsContainer />
    <CreateModal navigation={navigation} />
  </View>
);

export default MarketPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
});
