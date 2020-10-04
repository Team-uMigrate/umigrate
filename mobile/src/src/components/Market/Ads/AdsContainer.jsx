import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import AdView from "./AdView";
import { AdsEndpoint } from "../../../utils/endpoints";

class AdsContainer extends Component {
  state = {
    ads: [],
    page: 1,
    filters: {},
    nextPageExists: true,
  };

  constructor(props) {
    super(props);
    this.getAds();
  }

  getAds = () => {
    AdsEndpoint.list(
      this.state.page,
      this.state.filters,
      (response) => {
        const nextPageExists = response.data.next !== null;
        let seen = {};

        this.setState({
          ads: this.state.ads
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
    return <AdView {...item} />;
  }

  render() {
    return (
      <View style={styles.adsContainer}>
        <FlatList
          data={this.state.ads}
          keyExtractor={(item, i) => i.toString()}
          renderItem={this.renderItem}
          onEndReached={() => {
            if (this.state.nextPageExists) {
              this.getAds();
            }
          }}
        />
      </View>
    );
  }
}

export default AdsContainer;

const styles = StyleSheet.create({
  adsContainer: {
    flexDirection: "column",
    marginBottom: "15%", // To make sure a bit of the bottom post isn't cut off
  },
});
