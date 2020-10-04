import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import EventView from "./EventView";
import PostView from "./PostView";
import { EventsEndpoint, PostsEndpoint } from "../../../utils/endpoints";

class FeedContainer extends Component {
  state = {
    posts: [],
    events: [],
    pageP: 1,
    pageE: 1,
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

  // posts

  // posts

  getPosts = () => {
    PostsEndpoint.list(
      this.state.pageP,
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
      this.state.pageE,
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

  // to sort the posts and events into one arrayc

  sortLists = (posts, events) => {
    let postCount = posts.length;
    let eventCount = events.length;
    let array = [];
    let totalCount = postCount + eventCount;
    let id = 1;

    while (postCount !== 0 || eventCount !== 0) {
      if (postCount === 0) {
        array = [events[eventCount - 1], ...array];
        eventCount--;
        continue;
      } else if (eventCount === 0) {
        array = [posts[postCount - 1], ...array];
        postCount--;
        continue;
      }

      let postDate = new Date(posts[postCount - 1].datetime_created);
      let eventDate = new Date(events[eventCount - 1].datetime_created);

      if (postDate < eventDate) {
        array = [posts[postCount - 1], ...array];
        postCount--;
      } else {
        // means event object is older, also if they were made at the same
        // time, default to event
        array = [events[eventCount - 1], ...array];
        eventCount--;
      }
    }

    return array;
  };

  renderItem({ item }) {
    if (item.start_datetime == null) {
      return <PostView {...item} />;
    } else {
      return <EventView {...item} />;
    }
  }

  render() {
    let list = [];
    list = this.sortLists(this.state.posts, this.state.events);
    return (
      <View style={styles.feedContainer}>
        <FlatList
          data={list}
          // keyExtractor={(item) => {item.id} /* Tell react native to use the id field as the key prop */}
          renderItem={this.renderItem}
          onEndReached={() => {
            if (this.state.hasMoreEvents) {
              this.state.pageE += 1;
              this.fetchEvents(this.state.pageE, {});
            }
            if (this.state.hasMorePosts) {
              this.state.pageP += 1;
              this.fetchPosts(this.state.pageP, {});
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
