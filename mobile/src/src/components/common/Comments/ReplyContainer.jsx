import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { CommentRepliesEndpoint } from '../../../utils/endpoints';
import ReplyView from './ReplyView';
import ShowRepliesButton from './ShowRepliesButton';

export class ReplyContainer extends Component {
  state = {
    replies: [],
    nextPageExists: false,
    nextPage: 1,
  };

  componentDidMount() {
    this.fetchReplies();
  }

  fetchReplies = () => {
    CommentRepliesEndpoint.list(
      this.state.nextPage,
      this.props.commentId,
      {},
      (response) => {
        const seen = {};
        const nextPageExists = response.data.next !== null;
        // Check if there's another page after this one
        this.setState({
          nextPageExists,
          // This extends the comment list and filters out any duplicates that happen to show up
          replies: this.state.replies
            .concat(response.data.results)
            .filter((t) => (seen.hasOwnProperty(t.id) ? false : (seen[t.id] = true))),
          nextPage: nextPageExists
            ? this.state.nextPage + 1
            : this.state.nextPage,
        });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  render() {
    return (
      <View style={styles.repliesContainer}>
        {this.state.replies.map((result, i) => <ReplyView key={i} {...result} />)}

        {/* Button to fetch more replies */}
        <ShowRepliesButton
          buttonVisible={this.state.nextPageExists} //
          fetchReplies={this.fetchReplies}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  repliesContainer: {
    paddingLeft: '10%',
  },
});
