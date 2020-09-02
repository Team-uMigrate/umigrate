import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import AdView from "./AdView";
import { BASE_URL, ADS_ENDPOINT } from "../../../constants/urls/apiUrls";
import likeResource from "../../../utils/api/resources/likeResource";
import listResource from "../../../utils/api/resources/listResource";
import { AD_CATEGORY_CHOICES, REGION_CHOICES } from "../../../constants/misc/resourceChoices";
import AuthContext from "../../../contexts/AuthContext";
import cleanLoadedResources from "../../../utils/api/misc/cleanLoadedResources";

class AdContainer extends Component {
  static contextType = AuthContext;

  state = {
    ads: [],
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
    listResource(this, (data) => this.setState({ads: cleanLoadedResources(this.state.ads, data), page: this.state.page + 1}),
      BASE_URL + ADS_ENDPOINT, this.state.page)
    };

  handleObserver = (entities, options) => {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.loadPosts();
    }
    this.setState({prevY: y});
  };

  // Todo: fix liking
  handleLike = (id) => {
    likeResource(this, BASE_URL + ADS_ENDPOINT, id);
  };

  render() {
    return (
      <div>
      <ListGroup>
        {this.state.ads.map((ad) => (
          <AdView
            key={ad.id}
            id={ad.id}
            title={ad.title}
            description={ad.description}
            region={REGION_CHOICES[ad.region]}
            datetimeCreated={ad.datetime_created}
            category ={AD_CATEGORY_CHOICES[ad.category]}
            features={ad.features}
            price ={ad.price}
            creator={ad.creator}
            likedUsers= {ad.liked_users}
            taggedUsers={ad.tagged_users}
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

export default AdContainer;
