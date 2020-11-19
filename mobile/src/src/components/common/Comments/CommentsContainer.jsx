import React, { Component } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import CommentView from "./CommentView";
import { CommentsEndpoint } from "../../../utils/endpoints";
import Header from "../Header";

class CommentsContainer extends Component {
  state = {
    comments: [],
    nextPage: 1,
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
        let seen = {};
        let nextPageExists = response.data.next !== null;

        this.setState({
          // This extends the comment list and filters out any duplicates that happen to show up
          comments: this.state.comments
            .concat(response.data.results)
            .filter((t) =>
              seen.hasOwnProperty(t.id) ? false : (seen[t.id] = true)
            ),
          nextPageExists: nextPageExists,
          nextPage: nextPageExists
            ? this.state.nextPage + 1
            : this.state.nextPage,
        });
      },
      (error) => {
        console.log('error: ' + error);
      }
    );
  };

  renderItem = ({ item }) => {
    return <CommentView {...item} />;
  };

  render() {
    return (
      <>
        <Header title={"Comments"} isMessagingOrCommentsPage={true} />
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
      </>
    );
  }
}

export default CommentsContainer;

const styles = StyleSheet.create({
  commentsContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    margin: 10,
    flex: 1,
  },
  commentView: {
    flex: 2,
    alignSelf: 'center',
    margin: 50,
  },
});
