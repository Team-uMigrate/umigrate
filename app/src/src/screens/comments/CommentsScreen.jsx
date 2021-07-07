import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';
import { CommentsEndpoint } from '../../utils/endpoints';
import CommentView from '../../components/views/CommentView';
import { sharedLikesCommentsstyles } from '../../stylesheets/likesAndComments/likesAndComments.jsx';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useScrollToTop } from '@react-navigation/native';

const fetchItemsList = [
  async (page, filters) => await CommentsEndpoint.list(page, filters),
];
const itemViews = [
  (item, updateItem) => <CommentView item={item} updateItem={updateItem} />,
];

/**
 * Gets the initial state.
 * @param {RouteProp} route
 * @return {object}
 * */
const getInitialState = (route) => ({
  commentsFilters: {
    /** @type {number} */
    content_type: route.params['contentType'],
    /** @type {number} */
    object_id: route.params['postId'],
  },
});

/**
 * Renders the comments screen.
 * @param {StackNavigationProp} navigation
 * @param {RouteProp} route
 * @return {JSX.Element}
 * */
const CommentsScreen = ({ navigation, route }) => {
  const [commentsFilters, setCommentsFilters] = useState(
    getInitialState(route).commentsFilters
  );
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={sharedLikesCommentsstyles.container}>
      <Header title="Shared Item View" />
      <FeedContainer
        fetchItemsList={fetchItemsList}
        itemViews={itemViews}
        filtersList={[commentsFilters]}
        scrollRef={ref}
      />
      <CreateItemModal navigation={navigation} />
    </View>
  );
};

export default CommentsScreen;
