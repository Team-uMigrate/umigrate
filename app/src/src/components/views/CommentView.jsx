import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ReplyView from './ReplyView';
import { CommentRepliesEndpoint } from '../../utils/endpoints';
import FeedContainer from '../containers/FeedContainer';
import { useScrollToTop } from '@react-navigation/native';

const fetchItemsList = [
  async (page, filters) => await CommentRepliesEndpoint.list(page, filters),
];
const itemViews = [
  (item, updateItem) => <ReplyView item={item} updateItem={updateItem} />,
];

/** @type {function(number): object} */
const getInitialState = (id) => ({
  repliesFilters: {
    /** @type {number} */
    comment: id,
  },
});

/**
 * Renders a comment.
 * @param {object} item
 * @param {function(object): void} updateItem
 * @return {JSX.Element}
 */
const CommentView = ({ item, updateItem }) => {
  const [repliesFilters, setRepliesFilters] = useState(
    getInitialState(item.id).repliesFilters
  );
  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <View style={styles.commentView}>
      <ReplyView item={item} updateItem={updateItem} />
      <View style={{ paddingLeft: '10%' }}>
        <FeedContainer
          fetchItemsList={fetchItemsList}
          itemViews={itemViews}
          filtersList={[repliesFilters]}
          scrollRef={ref}
        />
      </View>
    </View>
  );
};

export default CommentView;

const styles = StyleSheet.create({
  commentView: {
    flex: 1,
    margin: 10,
    marginTop: 0,
  },
});
