import React, { Component, useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import EventView from './EventView';
import PostView from './PostView';
import { EventsEndpoint, PostsEndpoint } from '../../../utils/endpoints';
import { ThemeProvider } from '@react-navigation/native';

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
    refreshing: false,
  };

  componentDidMount = () => {
    this.getPosts();
    this.getEvents();
  };

  componentDidUpdate = () => {
    if (this.state.hasNewPosts && this.state.hasNewEvents) {
      this.setPages();
    }
  };

  wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
      nextPageP: 1,
      nextPageE: 1,
    });

    this.refreshPosts();
    this.refreshEvents();

    this.wait(1200).then(() => {
      this.setState({ refreshing: false });
    });
  };

  // getting of posts when refreshing
  // (resets post list to most recent ones)

  refreshPosts = () => {
    PostsEndpoint.list(
      1,
      this.state.filtersP,
      (response) => {
        this.setState({
          posts: [],
        });
        this.setState({
          posts: response.data.results,
          hasNewPosts: true,
          nextPageExistsP: response.data.next !== null,
        });
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  };

  // getting of posts when paginating
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
        console.log('error: ', error);
      }
    );
  };

  refreshEvents = () => {
    EventsEndpoint.list(
      this.state.nextPageE,
      this.state.filtersE,
      (response) => {
        this.setState({
          events: response.data.results,
          hasNewEvents: true,
          nextPageExistsE: response.data.next !== null,
        });
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  };

  // getting of events when paginating
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
        console.log('error: ', error);
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

  attendEvent = (id, shouldAttend) => {
    let index = this.state.events.findIndex((obj) => obj.id == id);
    let copyList = JSON.parse(JSON.stringify(this.state.events));
    copyList[index].is_attending = !this.state.events[index].is_attending;
    this.setState({ events: copyList });

    EventsEndpoint.attend(
      id,
      shouldAttend,
      () => {},
      (err) => {
        copyList[index].is_attending = !this.state.events[index].is_attending;
        this.setState({ events: copyList });
        console.log(err);
      }
    );
  };

  interestedEvent = (id, shouldInterested) => {
    let index = this.state.events.findIndex((obj) => obj.id == id);
    let copyList = JSON.parse(JSON.stringify(this.state.events));
    copyList[index].is_interested = !this.state.events[index].is_interested;
    this.setState({ events: copyList });

    EventsEndpoint.interested(
      id,
      shouldInterested,
      () => {},
      (err) => {
        copyList[index].is_interested = !this.state.events[index].is_interested;
        this.setState({ events: copyList });
        console.log(err);
      }
    );
  };

  renderItem = ({ item }) => {
    if (item.start_datetime == null) {
      return <PostView {...item} />;
    } else {
      item.attendEvent = this.attendEvent;
      item.interestedEvent = this.interestedEvent;
      return <EventView {...item} />;
    }
  };

  render() {
    return (
      <View style={styles.feedContainer}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          data={this.getList()}
          keyExtractor={(item, i) => i.toString()}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.state.nextPageExistsP) {
              this.getPosts();
            }
            if (this.state.nextPageExistsE) {
              this.getEvents();
            }
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default FeedContainer;

const styles = StyleSheet.create({
  feedContainer: {
    flexDirection: 'column',
    marginBottom: '15%', // To make sure a bit of the bottom post isn't cut off
  },
});
