import React from 'react';
import { View } from 'react-native';
import SearchContainer from '../../components/containers/SearchContainer';

const SearchScreen = ({ navigation }) => {
  return (
    <View style={{ marginBottom: '45%' }}>
      <SearchContainer setIsSearching={navigation.goBack} />
    </View>
  );
};

export default SearchScreen;
