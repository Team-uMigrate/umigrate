import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import EventView from "./EventView";
import PostView from "./PostView";
import { EventsEndpoint, PostsEndpoint } from "../../../utils/endpoints";

class FeedContainer extends Component {
  state = {
    posts: [],
    events: [],
    nextPageP: 1,
    nextPageE: 1,
    filtersP: {},
    filtersE: {},
    hasNewPosts: false,
    hasNewEvents: false,
    nextPageExistsP: true,
    nextPageExistsE: true,
    lastListDate: null,
  };

  constructor(props) {
    super(props);
    this.getPosts();
    this.getEvents();
  }

  componentDidUpdate() {
    if (this.state.hasNewPosts && this.state.hasNewEvents) {
      this.setPages();
    }
  }

  // posts

  getPosts = () => {
    PostsEndpoint.list(
      this.state.nextPageP,
      this.state.filtersP,
      (response) => {
        let seen = {};

        this.setState({
          posts: this.state.posts
            .concat(response.data.results)
            .filter((t) =>
              seen.hasOwnProperty(t.id) ? false : (seen[t.id] = true)
            ),
          hasNewPosts: true,
          nextPageExistsP: response.data.next !== null,
        });
      },
      (error) => {
        console.log("error: ", error);
      }
    );
  };

  // events

  getEvents = () => {
    EventsEndpoint.list(
      this.state.nextPageE,
      this.state.filtersE,
      (response) => {
        let seen = {};

        this.setState({
          events: this.state.events
            .concat(response.data.results)
            .filter((t) =>
              seen.hasOwnProperty(t.id) ? false : (seen[t.id] = true)
            ),
          hasNewEvents: true,
          nextPageExistsE: response.data.next !== null,
        });
      },
      (error) => {
        console.log("error: ", error);
      }
    );
  };

  // set the new pages for posts and events

  setPages = () => {
    if (this.state.posts.length > 0 && this.state.events.length > 0) {
      const lastPost = this.state.posts[this.state.posts.length - 1];
      const lastEvent = this.state.events[this.state.events.length - 1];
      const lastPostDate = Date.parse(lastPost.datetime_created);
      const lastEventDate = Date.parse(lastEvent.datetime_created);

      this.setState({
        nextPageP:
          lastPostDate >= lastEventDate && this.state.nextPageExistsP
            ? this.state.nextPageP + 1
            : this.state.nextPageP,
        nextPageE:
          lastPostDate <= lastEventDate && this.state.nextPageExistsE
            ? this.state.nextPageE + 1
            : this.state.nextPageE,
        hasNewPosts: false,
        hasNewEvents: false,
      });
    }
  };

  // to sort the posts and events into one array

  getList = () => {
    let list = [...this.state.posts, ...this.state.events];

    if (this.state.posts.length > 0 && this.state.events.length > 0) {
      const lastPost = this.state.posts[this.state.posts.length - 1];
      const lastEvent = this.state.events[this.state.events.length - 1];
      const lastPostDate = Date.parse(lastPost.datetime_created);
      const lastEventDate = Date.parse(lastEvent.datetime_created);
      const lastListDate = Math.max(lastPostDate, lastEventDate);

      list = list
        .filter((t) => Date.parse(t.datetime_created) >= lastListDate)
        .sort(
          (a, b) =>
            Date.parse(b.datetime_created) - Date.parse(a.datetime_created)
        );
    }

    return list;
  };

  renderItem({ item }) {
    if (item.start_datetime == null) {
      return <PostView {...item} />;
    } else {
      return <EventView {...item} />;
    }
  }

  render() {
    return (
      <View style={styles.feedContainer}>
        <FlatList
          data={this.getList()}
          keyExtractor={(item, i) => i.toString()}
          renderItem={this.renderItem}
          onEndReached={() => {
            if (this.state.nextPageExistsP) {
              this.getPosts();
            }
            if (this.state.nextPageExistsE) {
              this.getEvents();
            }
          }}
        />
      </View>
    );
  }
}

export default FeedContainer;

const styles = StyleSheet.create({
  feedContainer: {
    flexDirection: "column",
    marginBottom: "15%", // To make sure a bit of the bottom post isn't cut off
  },
});
