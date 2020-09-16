import React, { Component } from "react";
import UserView from "./UserView";
import { ListGroup } from "react-bootstrap";
import {
  REGION_CHOICES,
  SEX_CHOICES,
  TERM_CHOICES,
} from "../../../constants/misc/resourceChoices";
import AuthContext from "../../../contexts/AuthContext";
import cleanLoadedResources from "../../../utils/cleanLoadedResources";
import { UsersEndpoint } from "../../../utils/endpoints";

class UsersContainer extends Component {
  static contextType = AuthContext;

  state = {
    users: [],
    page: 1,
    prevY: 0,
    show: false,
    currentUser: [],
  };

  componentDidMount = () => {
    this.loadUsers();

    let options = {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(this.handleObserver, options);

    this.observer.observe(this.loadingRef);
  };

  loadUsers = () => {
    UsersEndpoint.list(
      this.state.page,
      {},
      (response) =>
        this.setState({
          users: cleanLoadedResources(this.state.users, response.data),
          page: this.state.page + 1,
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
      this.loadUsers();
    }
    this.setState({ prevY: y });
  };

  // for modal
  handleShow = (user) => {
    this.setState({ show: true });
    this.setState({ currentUser: user });
  };

  handleHide = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.users.map((user) => (
            // if we ever want to add more info, just get from the API
            // ie term, email, etc

            <UserView
              key={user.id}
              id={user.id}
              firstName={user.first_name}
              lastName={user.last_name}
              photo={user.photo}
              // change to handle modal
              handleShow={this.handleShow}
              handleHide={this.handleHide}
              preferredName={user.preferred_name}
              email={user.email}
              sex={SEX_CHOICES[user.sex]}
              datetimeCreated={user.datetime_created}
              birthday={user.birthday}
              bio={user.bio}
              currentTerm={TERM_CHOICES[user.current_term]}
              enrolledProgram={user.enrolled_program}
              region={REGION_CHOICES[user.region]}
              phoneNumber={user.phone_number}
              // have to setup default photos so this value is non null
              // photo={user.photo}
              streedAddress={user.street_address}
              city={user.city}
              division={user.division}
              country={user.country}
              show={this.state.show}
              currentUser={this.state.currentUser}
            />
          ))}
        </ListGroup>
        <div ref={(loadingRef) => (this.loadingRef = loadingRef)}>
          <span>Loading...</span>
        </div>
      </div>
    );
  }
}

export default UsersContainer;
