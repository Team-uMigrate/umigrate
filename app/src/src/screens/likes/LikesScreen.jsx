import { ListingsEndpoint, PostsEndpoint } from '../../utils/endpoints';
import ListingView from '../../components/views/ListingView';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';
import { sharedItemTabsStyles } from '../../stylesheets/tabs/tabs.jsx';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import UserView from '../../components/views/UserView';

const fetchItemsList = [
  async (page, filters) => await PostsEndpoint.likes(400, page),
];
const itemViews = [
  (item, updateItem) => <UserView item={item} updateItem={updateItem} />,
];

/**
 * Renders the likes screen.
 * @param {StackNavigationProp} navigation
 * @param {RouteProp} route
 * @return {JSX.Element}
 * */

const LikesScreen = ({ navigation, route }) => {
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={sharedItemTabsStyles.container}>
      <Header title="Likes" />
      <FeedContainer
        fetchItemsList={fetchItemsList}
        itemViews={itemViews}
        filtersList={[]}
        scrollRef={ref}
      />
      <CreateItemModal navigation={navigation} />
    </View>
  );
};

export default LikesScreen;
