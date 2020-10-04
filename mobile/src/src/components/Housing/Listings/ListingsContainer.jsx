import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ListingView from "./ListingView";
import { ListingsEndpoint } from "../../../utils/endpoints";

class ListingContainer extends Component {
  state = {
    listings: [],
    page: 1,
    filters: {},
    nextPageExists: true,
  };

  constructor(props) {
    super(props);
    this.getListings();
  }

  getListings = () => {
    ListingsEndpoint.list(
      this.state.page,
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
          page: nextPageExists ? this.state.page + 1 : this.state.page,
          nextPageExists: nextPageExists,
        });
      },
      (error) => {
        console.log("error: ", error);
      }
    );
  };

  renderItem({ item }) {
    return <ListingView {...item} />;
  }

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
