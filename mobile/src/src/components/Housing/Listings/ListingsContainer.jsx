import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ListingView from "./ListingView";
import {
  ListingsEndpoint,
  ListingCommentsEndpoint,
} from "../../../utils/endpoints";

class ListingContainer extends Component {
  state = {
    listings: [],
    nextPage: 1,
    filters: {},
    nextPageExists: true,
  };

  constructor(props) {
    super(props);
    this.getListings();
  }

  getListings = () => {
    ListingsEndpoint.list(
      this.state.nextPage,
      this.state.filters, //TODO add filter functionality and proper failure handling
      (response) => {
        const nextPageExists = response.data.next !== null;
        let seen = {};

        this.setState({
          listings: this.state.listings
            .concat(response.data.results)
            .filter((t) =>
              seen.hasOwnProperty(t.id) ? false : (seen[t.id] = true)
            ),
          nextPage: nextPageExists
            ? this.state.nextPage + 1
            : this.state.nextPage,
          nextPageExists: nextPageExists,
        });
      },
      (error) => {
        console.log("error: ", error);
      }
    );
  };

  likeListing = (id, shouldLike) => {
    ListingsEndpoint.like(
      id,
      shouldLike,
      () => {},
      (err) => {
        console.log(err);
      }
    );
  };

  createComment = (id, content, taggedUsers) => {
    let data = {
      listing: id,
      content: content,
      tagged_users: taggedUsers,
    };

    ListingCommentsEndpoint.post(
      data,
      () => {},
      (err) => {
        console.log(err);
      }
    );
  };

  renderItem = ({ item }) => {
    item.likeListing = this.likeListing;
    item.createComment = this.createComment;
    return <ListingView {...item} />;
  };

  render() {
    return (
      <View style={styles.listingContainer}>
        <FlatList
          data={this.state.listings}
          keyExtractor={(item, i) => i.toString()}
          renderItem={this.renderItem}
          onEndReached={() => {
            if (this.state.nextPageExists) {
              this.getListings();
            }
          }}
        />
      </View>
    );
  }
}

export default ListingContainer;

const styles = StyleSheet.create({
  listingContainer: {
    flexDirection: "column",
    marginBottom: "15%", // To make sure a bit of the bottom post isn't cut off
  },
});
