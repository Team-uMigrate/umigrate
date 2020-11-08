import { Text, TouchableHighlight } from "react-native";
import React from "react";

// My current plan is for this component to accept 2 callbacks:
// one to fetch more replies and another to collapse the list of replies in the CommentView component
const ShowRepliesButton = ({
  buttonVisible,
  fetchReplies,
  collapseReplies,
}) => {
  if (buttonVisible) {
    return (
      <TouchableHighlight onPress={fetchReplies}>
        <Text>Show more replies</Text>
      </TouchableHighlight>
    );
  } else return null;
};

export default ShowRepliesButton;
