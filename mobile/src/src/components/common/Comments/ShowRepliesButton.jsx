import { Text, TouchableHighlight, StyleSheet } from 'react-native';
import React from 'react';

// My current plan is for this component to accept 2 callbacks:
// one to fetch more replies and another to collapse the list of replies in the CommentView component
const ShowRepliesButton = ({
  buttonVisible,
  fetchReplies,
  collapseReplies, //TODO add functionality for this
}) => {
  if (buttonVisible) {
    return (
      <TouchableHighlight onPress={fetchReplies}>
        <Text style={styles.buttonText}>Show more replies</Text>
      </TouchableHighlight>
    );
  } else return null;
};

export default ShowRepliesButton;

const styles = StyleSheet.create({
  buttonText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
