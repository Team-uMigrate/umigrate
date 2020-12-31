import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateModal from '../../components/Create/CreateModal';
import { CommentsEndpoint } from '../../utils/endpoints';
import CommentView from '../../components/views/CommentView';

const endpoints = [CommentsEndpoint];
const itemViews = [(item) => <CommentView {...item} />];

// A screen that renders comments
const CommentsScreen = ({ navigation, route }) => {
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
      <CreateModal navigation={navigation} />
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
