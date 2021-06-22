import { EventsEndpoint, PostsEndpoint } from '../../utils/endpoints';
import PostView from '../../components/views/PostView';
import EventView from '../../components/views/EventView';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';

const getItemsSet = [
  async (page, filters) => await PostsEndpoint.list(page, filters),
  async (page, filters) => await EventsEndpoint.list(page, filters),
];
const itemViews = [
  (item) => <PostView {...item} />,
  (item) => <EventView {...item} />,
];

// A screen that renders community shared items
const CommunityScreen = ({ navigation, route }) => {
  const [postFilters, setPostFilters] = useState({});
  const [eventFilters, setEventFilters] = useState({});
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <Header title="Community Page" />
      <FeedContainer
        getItemsSet={getItemsSet}
        itemViews={itemViews}
        filtersList={[postFilters, eventFilters]}
        scrollRef={ref}
        feedName={route.name}
      />
      <CreateItemModal navigation={navigation} />
    </View>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
});
