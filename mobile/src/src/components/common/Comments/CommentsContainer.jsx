import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class CommentsContainer extends Component {
  state = {};

  CommentsContainer({ postId }) {
    this.state.postId = postId;
  }

  // TODO use this.props.navigation.fetchComments() to load and render comments

  render() {
    return (
      <View>
        <Text>This is a comment</Text>
      </View>
    );
  }
}

export default CommentsContainer;
