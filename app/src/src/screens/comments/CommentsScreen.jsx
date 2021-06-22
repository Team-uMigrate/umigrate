import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';
import { CommentsEndpoint } from '../../utils/endpoints';
import CommentView from '../../components/views/CommentView';

const getItemsSet = [
  async (page, filters) => await CommentsEndpoint.list(page, filters),
];
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
        getItemsSet={getItemsSet}
        itemViews={itemViews}
        filtersList={[commentsFilters]}
        scrollRef={ref}
      />
      <CreateItemModal navigation={navigation} />
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
