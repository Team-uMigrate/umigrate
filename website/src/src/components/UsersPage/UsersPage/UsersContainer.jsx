import React, { Component } from "react";
import UsersView from "./UsersView";
import { BASE_URL, USERS_ENDPOINT } from "../../../constants/urls/apiUrls";
import { ListGroup } from "react-bootstrap";
import { REGION_CHOICES, SEX_CHOICES, TERM_CHOICES } from "../../../constants/misc/resourceChoices";
import listResource from "../../../utils/api/resources/listResource";
import AuthContext from "../../../contexts/AuthContext";
import cleanLoadedResources from "../../../utils/api/misc/cleanLoadedResources";

class UsersContainer extends Component {
  static contextType = AuthContext;

  state = {
    users: [],
    page: 0,
    prevY: 0,
    show: false,
    currentUser: []
  };

  componentDidMount = () => {
    this.loadUsers();

    let options = {
      root: null,
      rootMargin: '100px',
      threshold: 1.0
    };

    this.observer = new IntersectionObserver(
      this.handleObserver,
      options
    );

    this.observer.observe(this.loadingRef);
  };

  loadUsers = () => {
    listResource(this, (data) => this.setState({users: cleanLoadedResources(this.state.users, data), page: this.state.page + 1}),
      BASE_URL + USERS_ENDPOINT, this.state.page)
    };

  handleObserver = (entities, options) => {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.loadUsers();
    }
    this.setState({prevY: y});
  };

  // for modal
  handleShow = (user) => {
    this.setState({ show: true });
    this.setState({ currentUser: user });
  };

  handleHide = () => {
    this.setState({ show: false });
  };

  render(){
    return (
      <div>
      <ListGroup>
        {this.state.users.map((user) => (
            // if we ever want to add more info, just get from the API
            // ie term, email, etc

          <UsersView
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
        <div ref={loadingRef => (this.loadingRef = loadingRef)}>
            <span>Loading...</span>
        </div>
      </div>
    )
  }
}

export default UsersContainer;
