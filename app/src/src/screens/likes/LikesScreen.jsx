import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';
import { LikesEndpoint } from '../../utils/endpoints'; // yet to be implemented
import LikedUserView from '../../components/views/LikedUserView';

const endpoints = [LikesEndpoint];
const itemViews = [(item) => <LikedUserView {...item} />];

// A screen that renders likes
const LikesScreen = ({ navigation, route }) => {
  const [likeFilters, setLikeFilters] = useState({
    content_type: route.params.contentType,
    object_id: route.params.postId,
  });
  const ref = useRef(null);

  return (
    <View style={styles.container}>
      <Header title="Shared Item View" />
      <FeedContainer
        endpoints={endpoints}
        itemViews={itemViews}
        filtersList={[likeFilters]}
        scrollRef={ref}
      />
      <CreateItemModal navigation={navigation} />
    </View>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
