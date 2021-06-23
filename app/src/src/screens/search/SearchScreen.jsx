import React from 'react';
import { View } from 'react-native';
import SearchResults from '../../components/containers/SearchResults';

const SearchScreen = ({ navigation }) => {
  return (
    <View style={{ marginBottom: '45%' }}>
      <SearchResults setIsSearching={() => navigation.goBack()} />
    </View>
  );
};

export default SearchScreen;
