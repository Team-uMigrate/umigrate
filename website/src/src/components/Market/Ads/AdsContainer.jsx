import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import AdView from "./AdView";
import {
  AD_CATEGORY_CHOICES,
  REGION_CHOICES,
} from "../../../constants/misc/resourceChoices";
import AuthContext from "../../../contexts/AuthContext";
import cleanLoadedResources from "../../../utils/cleanLoadedResources";
import { AdsEndpoint } from "../../../utils/endpoints";

class AdsContainer extends Component {
  static contextType = AuthContext;

  state = {
    ads: [],
    page: 1,
    prevY: 0,
  };

  componentDidMount = () => {
    this.loadPosts();

    let options = {
      root: null,
      rootMargin: "100px",
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(this.handleObserver, options);

    this.observer.observe(this.loadingRef);
  };

  loadPosts = () => {
    AdsEndpoint.list(
      this.state.page,
      {},
      (response) =>
        this.setState({
          ads: cleanLoadedResources(this.state.ads, response.data.results),
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
      this.loadPosts();
    }
    this.setState({ prevY: y });
  };

  // Todo: fix liking
  handleLike = (id) => {};

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
              category={AD_CATEGORY_CHOICES[ad.category]}
              features={ad.features}
              price={ad.price}
              creator={ad.creator}
              likedUsers={ad.liked_users}
              taggedUsers={ad.tagged_users}
              handleLike={this.handleLike}
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

export default AdsContainer;
