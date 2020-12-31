import { CommentRepliesEndpoint } from '../../utils/endpoints';
import { StyleSheet, View } from 'react-native';
import ReplyView from '../views/ReplyView';
import ShowRepliesButton from '../buttons/ShowRepliesButton';
import React, { Component } from 'react';

export class ReplyContainer extends Component {
  state = {
    replies: [],
    nextPageExists: false,
    nextPage: 1,
  };

  componentDidMount = async () => {
    await this.fetchReplies();
  };

  fetchReplies = async () => {
    const response = await CommentRepliesEndpoint.list(
      this.props.commentId,
      this.state.nextPage,
      {}
    );
    let seen = {};
    let nextPageExists = response.data.next !== null;
    // Check if there's another page after this one
    this.setState({
      nextPageExists: nextPageExists,
      // This extends the comment list and filters out any duplicates that happen to show up
      replies: this.state.replies
        .concat(response.data.results)
        .filter((t) =>
          seen.hasOwnProperty(t.id) ? false : (seen[t.id] = true)
        ),
      nextPage: nextPageExists ? this.state.nextPage + 1 : this.state.nextPage,
    });
  };

  render() {
    return (
      <View style={styles.repliesContainer}>
        {this.state.replies.map((result, i) => {
          return <ReplyView key={i} {...result} />;
        })}

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
