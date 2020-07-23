import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import MessageView from "./MessageView";
import TextBoxContainer from "../TextBox";
import listResource from "../../../utils/api/resources/listResource";
import AuthContext from "../../../contexts/AuthContext";
import {
  BASE_URL,
  ROOMS_ENDPOINT,
  MESSAGES_EXTENSION,
  MESSAGING_WEBSOCKET
} from "../../../constants/urls/apiUrls";
import likeResource from "../../../utils/api/resources/likeResource";
import { USER_ID } from "../../../constants/misc/localStorageKeys";
import cleanLoadedResources from "../../../utils/api/misc/cleanLoadedResources";


class MessageContainer extends Component {
  static contextType = AuthContext;

  state = {
    messages: [],
    currentRoom: null,
    text: "",
    page: 0,
    prevY: 0
  };

  ws;

  componentDidMount = () => {

    window.onscroll = () => {

      if(window.pageYOffset === 0) {
        if(this.state.currentRoom != null){
          let options = {
            root: null,
            rootMargin: '200px',
            threshold: 1.0
          };

          this.observer = new IntersectionObserver(
            this.handleObserver,
            options
          );

          this.observer.observe(this.loadingRef);

        } else {
            // do nothing
        }
      }
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.currentRoom !== prevState.currentRoom) {
      this.setState({
        messages: [],
        page: 0
      });
    }
  }

  loadPosts = () => {
    listResource(this, (data) => this.setState({messages: cleanLoadedResources(this.state.messages.reverse(), data).reverse(), page: this.state.page + 1}),
    BASE_URL + ROOMS_ENDPOINT + this.state.currentRoom.id + MESSAGES_EXTENSION, this.state.page)
    };

  handleObserver = (entities, options) => {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY < y) {
      this.loadPosts();
    }
    this.setState({prevY: y});
  };

  setCurrentRoom = (room) => {
    listResource(this, (data) => this.setState({messages: cleanLoadedResources(this.state.messages.reverse(), data).reverse(), page: this.state.page + 1}),
      BASE_URL + ROOMS_ENDPOINT + room.id + MESSAGES_EXTENSION);

    this.ws = new WebSocket(MESSAGING_WEBSOCKET + room.id + "/");

    this.ws.onopen = () => {
      console.log("Connected");
      this.setState({prevY: 0});
      this.setState({currentRoom: room});
    };

    this.ws.onmessage = (ev) => {
      let message = JSON.parse(ev.data);
      this.setState({messages: [...this.state.messages, message]});
    };

    this.ws.onclose = () => {
      this.setState({ws: new WebSocket(MESSAGING_WEBSOCKET + room.id + "/")});
    };
  };

  handleSend = () => {
    let content = this.state.text.trim();

    if(content.length !== 0){
      this.ws.send(JSON.stringify({
        'content': content
      }));
      this.setState({text: ""})
    }
  };

  handleChange = (e) => {
    this.setState({text: e.target.value});
  };

  handleLike = (id) => {
    likeResource(this, BASE_URL + ROOMS_ENDPOINT + "messages/", id);
  };

  render() {
    if(this.state.currentRoom === null){
      return (
        <div>
          Please select a room
        </div>
      )
    }

    let room = this.state.currentRoom;

    let roomTitle = room.isDirectMessaging ?
      (localStorage.getItem(USER_ID) === room.members[0].id ?
        room.members[0].preferred_name : room.members[1].preferred_name)
      : room.title;

    return (
      <div>
        <h3>
          {roomTitle}
        </h3>
        <div>
          <div ref={loadingRef => (this.loadingRef = loadingRef)}>
              <span>Scroll up from below to retrieve previous messages.</span>
          </div>
          <ListGroup>
            {this.state.messages.map((message) => (
              <MessageView
                key={message.id}
                id={message.id}
                content={message.content}
                creator={message.creator}
                datetimeCreated={message.datetime_created}
                handleLike={this.handleLike}
              />
            ))}
          </ListGroup>
        </div>
        <TextBoxContainer
          handleSend={this.handleSend}
          handleChange={this.handleChange}
          text={this.state.text}
        />
      </div>
    )
  }


}

export default MessageContainer
