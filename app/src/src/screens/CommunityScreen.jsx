import { EventsEndpoint, PostsEndpoint } from '../utils/endpoints';
import PostView from '../components/Community/Feed/PostView';
import EventView from '../components/Community/Feed/EventView';
import React, { useRef, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Header from '../components/common/Header';
import FeedContainer from '../components/common/FeedContainer';
import CreateModal from '../components/Create/CreateModal';

const endpoints = [PostsEndpoint, EventsEndpoint];
const itemViews = [
  (item) => <PostView {...item} />,
  (item) => <EventView {...item} />,
];

// A screen that renders community shared items
const CommunityScreen = ({ navigation }) => {
  const [postFilters, setPostFilters] = useState({});
  const [eventFilters, setEventFilters] = useState({});
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.container}>
      <Header title="Community Page" />
      <FeedContainer
        endpoints={endpoints}
        itemViews={itemViews}
        filtersList={[postFilters, eventFilters]}
        scrollRef={ref}
      />
      <CreateModal navigation={navigation} />
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
