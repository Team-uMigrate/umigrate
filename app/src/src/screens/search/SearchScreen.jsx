import React from 'react';
import { View } from 'react-native';
import SearchContainer from '../../components/containers/SearchContainer';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Renders the search screen.
 * @param {StackNavigationProp} navigation
 * @return {JSX.Element}
 * */
const SearchScreen = ({ navigation }) => {
  return (
    <View style={{ marginBottom: '45%' }}>
      <SearchContainer setIsSearching={navigation.pop()} />
    </View>
  );
};

export default SearchScreen;
