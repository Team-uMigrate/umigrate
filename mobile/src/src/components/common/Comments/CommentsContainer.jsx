import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class CommentsContainer extends Component {
  state = {};

  CommentsContainer({ postId, fetchComments }) {
    this.state.postId = postId;
    this.state.fetchComments = fetchComments;
  }

  render() {
    return (
      <View>
        <Text>This is a comment</Text>
      </View>
    );
  }
}

export default CommentsContainer;
