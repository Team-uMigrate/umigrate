import { EventsEndpoint, PostsEndpoint } from '../../utils/endpoints';
import PostView from '../../components/views/PostView';
import EventView from '../../components/views/EventView';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';
import UserViewModal from '../../components/modals/UserViewModal';
import { sharedItemTabsStyles } from '../../stylesheets/tabs/tabs.jsx';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

const fetchItemsList = [
  async (page, filters) => await PostsEndpoint.list(page, filters),
  async (page, filters) => await EventsEndpoint.list(page, filters),
];
const itemViews = [
  (item, updateItem) => <PostView item={item} updateItem={updateItem} />,
  (item, updateItem) => <EventView item={item} updateItem={updateItem} />,
];

/**
 * Renders the community screen.
 * @param {StackNavigationProp} navigation
 * @param {RouteProp} route
 * @return {JSX.Element}
 * */
const CommunityScreen = ({ navigation, route }) => {
  const [postFilters, setPostFilters] = useState({});
  const [eventFilters, setEventFilters] = useState({});
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={sharedItemTabsStyles.container}>
      <Header title="Community Page" />
      <FeedContainer
        fetchItemsList={fetchItemsList}
        itemViews={itemViews}
        filtersList={[postFilters, eventFilters]}
        scrollRef={ref}
        feedName={route.name}
      />
      <CreateItemModal navigation={navigation} />
      <UserViewModal navigation={navigation} />
    </View>
  );
};

export default CommunityScreen;
