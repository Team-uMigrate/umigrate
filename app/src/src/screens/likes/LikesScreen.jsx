import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';
import { CommentsEndpoint } from '../../utils/endpoints';
import CommentView from '../../components/views/CommentView';
import UsersList from '../../components/common/UsersList';

const endpoints = [CommentsEndpoint];
const itemViews = [(item) => <CommentView {...item} />];

// A screen that renders comments
const LikesScreen = ({ navigation, route }) => {
  const [commentsFilters, setCommentsFilters] = useState({
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
        filtersList={[commentsFilters]}
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
