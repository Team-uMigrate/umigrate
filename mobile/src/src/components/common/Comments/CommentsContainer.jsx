import React, { Component } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import CommentView from "./CommentView";
import { CommentsEndpoint } from "../../../utils/endpoints";

class CommentsContainer extends Component {
  state = {
    comments: [],
    nextPage: 1,
    incrementPage: () => {
      this.setState({ nextPage: this.state.nextPage + 1 });
    },
    nextPageExists: true,
  };

  constructor(props) {
    super(props);

    this.postId = props.route.params.postId;
    this.contentType = props.route.params.contentType;
  }

  componentDidMount() {
    this.fetchComments(this.contentType, this.postId);
  }

  fetchComments = (contentType, objectId) => {
    CommentsEndpoint.list(
      contentType,
      objectId,
      this.state.nextPage,
      {},
      (response) => {
        this.setState({
          comments: this.state.comments.concat(response.data.results),
          nextPageExists: response.data.next !== null,
        });
      },
      (error) => {
        console.log("error: " + error);
      }
    );

    this.state.incrementPage();
  };

  renderItem = ({ item }) => {
    return <CommentView {...item} />;
  };

  render() {
    return (
      <View style={styles.commentsContainer}>
        <FlatList
          data={this.state.comments}
          keyExtractor={(item, i) => i.toString()}
          renderItem={this.renderItem}
          onEndReached={() => {
            if (this.state.nextPageExists)
              this.fetchComments(this.contentType, this.postId);
          }}
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
