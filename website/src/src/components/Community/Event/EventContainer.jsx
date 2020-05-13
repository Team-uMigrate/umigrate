import React, { Component } from "react";
import EventView from "./EventView";
import { ListGroup } from "react-bootstrap";
import { BASE_URL, EVENTS_ENDPOINT } from "../../../constants/urls/apiUrls";
import likeResource from "../../../utils/api/resources/likeResource";
import listResource from "../../../utils/api/resources/listResource";
import { REGION_CHOICES } from "../../../constants/misc/resourceChoices";
import AuthContext from "../../../contexts/AuthContext";

class EventContainer extends Component {
  static contextType = AuthContext;

  state = {
    events: []
  };

  componentDidMount = () => {
    listResource(this, (data) => this.setState({events: data}), BASE_URL + EVENTS_ENDPOINT);
  };

  handleLike = (id) => {
    likeResource(this, BASE_URL + EVENTS_ENDPOINT, id);
  };

  render(){
    return (
      <ListGroup>
        {this.state.events.map((event) => (
          <EventView
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            region={REGION_CHOICES[event.region]}
            datetimeCreated={event.datetime_created}
            startDatetime={event.start_datetime}
            endDatetime={event.end_datetime}
            price={event.price}
            streetAddress={event.street_address}
            city={event.city}
            division={event.division}
            country={event.country}
            creator={event.creator}
            likedUsers={event.liked_users}
            taggedUsers={event.tagged_users}
            interestedUsers= {event.interested_users}
            attendingUsers={event.attending_users}
            handleLike={this.handleLike}
          />
        ))}
      </ListGroup>
    )
  }
}

export default EventContainer;
