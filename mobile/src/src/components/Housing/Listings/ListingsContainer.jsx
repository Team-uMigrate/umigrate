import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ListingView from "./ListingView";
import { ListingsEndpoint, CommentsEndpoint } from "../../../utils/endpoints";

class ListingContainer extends Component {
  state = {
    listings: [],
    nextPage: 1,
    filters: {},
    nextPageExists: true,
  };

  componentDidMount = () => {
    this.getListings();
  };

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
    // updates number of likes
    let index = this.state.listings.findIndex((obj) => obj.id == id);
    let copyList = JSON.parse(JSON.stringify(this.state.listings));
    shouldLike == true
      ? (copyList[index].likes = this.state.listings[index].likes + 1)
      : (copyList[index].likes = this.state.listings[index].likes - 1);
    this.setState({ listings: copyList });

    ListingsEndpoint.like(
      id,
      shouldLike,
      () => {},
      (err) => {
        console.log(err);
        // undo changes
        shouldLike == true
          ? (copyList[index].likes = this.state.listings[index].likes - 1)
          : (copyList[index].likes = this.state.listings[index].likes + 1);
        this.setState({ listings: copyList });
      }
    );
  };

  sendComment = (data) => {
    // updates number of comments
    let index = this.state.listings.findIndex(
      (obj) => obj.id == data.object_id
    );
    let copyList = JSON.parse(JSON.stringify(this.state.listings));
    copyList[index].comments = this.state.listings[index].comments + 1;
    this.setState({ listings: copyList });

    CommentsEndpoint.post(
      data,
      () => {},
      (error) => {
        console.log(error);
        // undo changes
        copyList[index].comments = this.state.listings[index].comments - 1;
        this.setState({ listings: copyList });
      }
    );
  };

  renderItem = ({ item }) => {
    item.likeListing = this.likeListing;
    item.sendComment = this.sendComment;
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
