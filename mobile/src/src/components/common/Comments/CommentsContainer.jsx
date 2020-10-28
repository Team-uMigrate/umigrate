import React, { Component } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import CommentView from "./CommentView";

class CommentsContainer extends Component {
  state = {
    comments: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ],
    nextPage: 1,
    nextPageExists: true,
  };

  constructor(props) {
    super(props);
    this.state.postId = props.postId;
    //this.state.comments.concat(this.props.navigation.fetchComments());
    console.log(this.state.comments);
  }

  renderItem = ({ item }) => {
    return <CommentView {...item} />;
  };

  // TODO use this.props.navigation.fetchComments() to load and render comments

  render() {
    return (
      <View style={styles.commentsContainer}>
        <FlatList
          data={this.state.comments}
          keyExtractor={(item, i) => i.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default CommentsContainer;

const styles = StyleSheet.create({
  commentsContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    margin: 10,
    flex: 1,
  },
  commentView: {
    flex: 2,
    alignSelf: "center",
    margin: 50,
  },
});
