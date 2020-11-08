import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import ProfilePhoto from "../ProfilePhoto";
import { CommentRepliesEndpoint } from "../../../utils/endpoints";
import CommentReplyView from "./CommentReplyView";
import ShowRepliesButton from "./ShowRepliesButton";

class CommentView extends Component {
  state = {
    replies: [],
    setReplies: (newReplies) => {
      this.setState({ replies: newReplies });
    },
    nextPageExists: true,
    nextPage: 1,
  };

  constructor(props) {
    super(props);
    // The date is the first 10 characters as the dateTime string looks like this: 2020-11-02T23:49:23.846475Z
    this.date = props.datetime_created.substring(0, 10);
    this.time = props.datetime_created.substring(11, 16);
  }

  componentDidMount() {
    this.fetchReplies(1);
  }

  fetchReplies = (page) => {
    CommentRepliesEndpoint.list(
      page,
      this.props.id,
      {},
      (response) => {
        // Check if there's another page after this one
        this.setState({ nextPageExists: response.data.next != null });
        this.state.setReplies(this.state.replies.concat(response.data.results));
        this.setState({ nextPage: this.state.nextPage + 1 });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render = () => {
    return (
      <View style={styles.commentView}>
        <View style={{ flexDirection: "row" }}>
          {/* Pushes the user's name forward so it lines up with the content */}
          <View style={{ flex: 1 }} />
          <View style={{ flex: 6 }}>
            <Text style={{ fontSize: 12.5 }}>
              {this.props.creator.preferred_name}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: "2.5%", flex: 1 }}>
            <ProfilePhoto photo={this.props.creator.profile_photo} size={30} />
          </View>
          <View style={styles.contentContainer}>
            <Text>{this.props.content}</Text>
          </View>
          <View style={styles.timestampView}>
            <Text style={styles.timestamp}>{this.date + "\n" + this.time}</Text>
          </View>
        </View>

        {/* Replies */}
        <View style={styles.repliesContainer}>
          {this.state.replies.map((result, i) => {
            return <CommentReplyView key={i} {...result} />;
          })}

          {/* Button to fetch more replies */}
          <ShowRepliesButton
            buttonVisible={this.state.nextPageExists}
            fetchReplies={this.fetchReplies}
          />
        </View>
      </View>
    );
  };
}

export default CommentView;

const styles = StyleSheet.create({
  commentView: {
    flex: 1,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  contentContainer: {
    borderRadius: 20,
    backgroundColor: "#EBEBEB",
    flex: 6,
    padding: 5,
    paddingLeft: 12,
    paddingRight: 5,
  },
  timestampView: {
    marginLeft: 2,
    alignSelf: "flex-end",
    flex: 1.5,
  },
  timestamp: {
    color: "gray",
    fontSize: 10,
    paddingBottom: 5,
  },
  repliesContainer: {
    paddingLeft: "10%",
  },
});
