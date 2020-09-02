import React, { Component } from "react";
import ListingView from "./ListingView";
import { BASE_URL, HOUSING_ENDPOINT } from "../../../constants/urls/apiUrls";
import { ListGroup } from "react-bootstrap";
import likeResource from "../../../utils/api/resources/likeResource";
import listResource from "../../../utils/api/resources/listResource";
import { HOUSING_CATEGORY_CHOICES, REGION_CHOICES, TERM_CHOICES } from "../../../constants/misc/resourceChoices";
import AuthContext from "../../../contexts/AuthContext";
import cleanLoadedResources from "../../../utils/api/misc/cleanLoadedResources";

class ListingContainer extends Component {
  static contextType = AuthContext;

  state = {
    housingPosts: [],
    page: 0,
    prevY: 0
  };

  componentDidMount = () => {
    this.loadPosts();

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

  loadPosts = () => {
    listResource(this, (data) => this.setState({housingPosts: cleanLoadedResources(this.state.housingPosts, data), page: this.state.page + 1}),
      BASE_URL + HOUSING_ENDPOINT, this.state.page)
    };

  handleObserver = (entities, options) => {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.loadPosts();
    }
    this.setState({prevY: y});
  };

  // todo
  handleLike = (id) => {
    likeResource(this, BASE_URL + HOUSING_ENDPOINT, id);
  };

  render(){
    return (
      <div>
      <ListGroup>
        {this.state.housingPosts.map((housing) => (
          <ListingView
            key={housing.id}
            id={housing.id}
            title={housing.title}
            description={housing.description}
            region={REGION_CHOICES[housing.region]}
            datetimeCreated={housing.datetime_created}
            category ={HOUSING_CATEGORY_CHOICES[housing.category]}
            features={housing.features}
            price={housing.price}
            term={TERM_CHOICES[housing.term]}
            streetAddress={housing.street_address}
            city={housing.city}
            division={housing.division}
            country={housing.country}
            creator={housing.creator}
            likedUsers= {housing.liked_users}
            taggedUsers={housing.tagged_users}
            handleLike={this.handleLike}
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

export default ListingContainer;
