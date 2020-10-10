import React, { Component } from "react";
import PostView from "./PostView";
import EventView from "../Event/EventView";
import { ListGroup } from "react-bootstrap";
import { REGION_CHOICES } from "../../../constants/misc/resourceChoices";
import AuthContext from "../../../contexts/AuthContext";
import cleanLoadedResources from "../../../utils/cleanLoadedResources";
import { EventsEndpoint, PostsEndpoint } from "../../../utils/endpoints";

class PostContainer extends Component {
  static contextType = AuthContext;

  state = {
    posts: [],
    events: [],
    postsLoaded: false,
    eventsLoaded: false,
    renderedPosts: [],
    renderedEvents: [],
    postsPage: 1,
    eventsPage: 1,
    prevY: 0,
  };

  componentDidMount = () => {
    this.loadPosts();
    this.loadEvents();

    let options = {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(this.handleObserver, options);

    this.observer.observe(this.loadingRef);
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (this.state.postsLoaded && this.state.eventsLoaded) {
      let combinedList = this.getLists();
      this.setState({
        renderedPosts: combinedList.posts,
        renderedEvents: combinedList.events,
        postsPage: combinedList.postsPage,
        eventsPage: combinedList.eventsPage,
        postsLoaded: false,
        eventsLoaded: false,
      });
    }
  };

  loadPosts = () => {
    PostsEndpoint.list(
      this.state.postsPage,
      {},
      (response) =>
        this.setState({
          posts: cleanLoadedResources(this.state.posts, response.data.results),
          postsLoaded: true,
        }),
      (error) => {
        if (error.response != null && error.response.status === 401) {
          this.context.setAuthenticated(false);
          this.context.setRegistered(false);
        }
      }
    );
  };

  loadEvents = () => {
    EventsEndpoint.list(
      this.state.eventsPage,
      {},
      (response) =>
        this.setState({
          events: cleanLoadedResources(
            this.state.events,
            response.data.results
          ),
          eventsLoaded: true,
        }),
      (error) => {
        if (error.response != null && error.response.status === 401) {
          this.context.setAuthenticated(false);
          this.context.setRegistered(false);
        }
      }
    );
  };

  handleObserver = (entities, options) => {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.loadPosts();
      this.loadEvents();
    }
    this.setState({ prevY: y });
  };

  // TODO: figure out how to handle liking posts properly
  handleLikePosts = (id) => {};

  handleLikeEvents = (id) => {};

  getLists = () => {
    let posts = this.state.posts;
    let events = this.state.events;
    let combinedList = {
      posts: [],
      events: [],
      postsPage: this.state.postsPage,
      eventsPage: this.state.postsPage,
    };
    let toDate = (post) => Date.parse(post.datetime_created);

    // Checks if posts or events are empty
    if (posts.length === 0 || events.length === 0) {
      if (posts.length !== 0) {
        combinedList.posts = posts;
        combinedList.postsPage++;
      } else if (events.length !== 0) {
        combinedList.events = events;
        combinedList.eventsPage++;
      }
    } else {
      // Keeps only all the posts if the last post is more recent than the first event
      if (toDate(posts[posts.length - 1]) >= toDate(events[0])) {
        combinedList.posts = posts;
        combinedList.postsPage++;
      }

      // Keeps only all the events if the last event is more recent than the first post
      else if (toDate(events[events.length - 1]) >= toDate(posts[0])) {
        combinedList.events = events;
        combinedList.eventsPage++;
      }

      // Keeps all the posts and only the events that are more recent than the last post if the last post is more recent than the last event
      else if (
        toDate(posts[posts.length - 1]) > toDate(events[events.length - 1])
      ) {
        combinedList.posts = posts;
        combinedList.postsPage++;
        for (let i = 0; i < events.length; i++) {
          if (toDate(events[i]) > toDate(posts[posts.length - 1])) {
            combinedList.events.push(events[i]);
          }
        }
      }

      // Keeps all events and only the posts that are more recent than the event if the last event is more recent than the last post
      else if (
        toDate(events[events.length - 1]) > toDate(posts[posts.length - 1])
      ) {
        combinedList.events = events;
        combinedList.eventsPage++;
        for (let i = 0; i < posts.length; i++) {
          if (toDate(posts[i]) > toDate(events[events.length - 1])) {
            combinedList.posts.push(posts[i]);
          }
        }
      }

      // Keeps all posts and events if the last post and event were made at the same time
      else {
        combinedList.posts = posts;
        combinedList.events = events;
        combinedList.postsPage++;
        combinedList.eventsPage++;
      }
    }
    return combinedList;
  };

  sortLists = (posts, events) => {
    let postCount = posts.length;
    let eventCount = events.length;
    let array = [];

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

  render() {
    let community = [];
    community = this.sortLists(
      this.state.renderedPosts,
      this.state.renderedEvents
    );

    return (
      <div>
        <ListGroup>
          {community.map((post) =>
            post.start_datetime == null ? (
              <PostView
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                region={REGION_CHOICES[post.region]}
                datetimeCreated={post.datetime_created}
                creator={post.creator}
                likedUsers={post.liked_users}
                taggedUsers={post.tagged_users}
                handleLike={this.handleLikePosts}
              />
            ) : (
              <EventView
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                region={REGION_CHOICES[post.region]}
                datetimeCreated={post.datetime_created}
                startDatetime={post.start_datetime}
                endDatetime={post.end_datetime}
                price={post.price}
                streetAddress={post.street_address}
                city={post.city}
                division={post.division}
                country={post.country}
                creator={post.creator}
                likedUsers={post.liked_users}
                taggedUsers={post.tagged_users}
                interestedUsers={post.interested_users}
                attendingUsers={post.attending_users}
                handleLike={this.handleLikeEvents}
              />
            )
          )}
        </ListGroup>
        <div ref={(loadingRef) => (this.loadingRef = loadingRef)}>
          <span>Loading...</span>
        </div>
      </div>
    );
  }
}

export default PostContainer;
