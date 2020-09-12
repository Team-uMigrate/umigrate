import React, { Component } from "react";
import ListingView from "./ListingView";
import { BASE_URL, LISTINGS_ENDPOINT } from "../../../constants/urls/apiUrls";
import { ListGroup } from "react-bootstrap";
import likeResource from "../../../utils/api/resources/likeResource";
import listResource from "../../../utils/api/resources/listResource";
import { HOUSING_CATEGORY_CHOICES, REGION_CHOICES, TERM_CHOICES } from "../../../constants/misc/resourceChoices";
import AuthContext from "../../../contexts/AuthContext";
import cleanLoadedResources from "../../../utils/api/misc/cleanLoadedResources";

class ListingContainer extends Component {
  static contextType = AuthContext;

  state = {
    listings: [],
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
    listResource(this, (data) => this.setState({housingPosts: cleanLoadedResources(this.state.listings, data), page: this.state.page + 1}),
      BASE_URL + LISTINGS_ENDPOINT, this.state.page)
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
    likeResource(this, BASE_URL + LISTINGS_ENDPOINT, id);
  };

  render(){
    return (
      <div>
      <ListGroup>
        {this.state.listings.map((listing) => (
          <ListingView
            key={listing.id}
            id={listing.id}
            title={listing.title}
            description={listing.description}
            region={REGION_CHOICES[listing.region]}
            datetimeCreated={listing.datetime_created}
            category ={HOUSING_CATEGORY_CHOICES[listing.category]}
            features={listing.features}
            price={listing.price}
            term={TERM_CHOICES[listing.term]}
            streetAddress={listing.street_address}
            city={listing.city}
            division={listing.division}
            country={listing.country}
            creator={listing.creator}
            likedUsers= {listing.liked_users}
            taggedUsers={listing.tagged_users}
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
