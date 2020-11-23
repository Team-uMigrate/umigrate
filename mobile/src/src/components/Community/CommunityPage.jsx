import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { EventsEndpoint, PostsEndpoint } from '../../utils/endpoints';
import FeedContainer from '../common/FeedContainer';
import Header from '../common/Header';
import CreateModal from '../Create/CreateModal';
import PostView from './Feed/PostView';
import EventView from './Feed/EventView';
import { useScrollToTop } from '@react-navigation/native';

const endpoints = [PostsEndpoint, EventsEndpoint];
const itemViews = [
  (item) => <PostView {...item} />,
  (item) => <EventView {...item} />,
];

const CommunityPage = ({ navigation }) => {
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

export default CommunityPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
});
