import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import AdView from "./AdView";
import { AdsEndpoint } from "../../../utils/endpoints";

class AdsContainer extends Component {
  state = {
    ads: [],
    page: 1,
    hasMoreAds: true,
  };

  constructor(props) {
    super(props);
    this.state.ads = [];
    this.fetchAds(1, {});
  }

  extendAds = (newAds) => {
    this.setState({
      ads: this.state.ads.concat(newAds),
    });
  };

  fetchAds = (page, filters) => {
    AdsEndpoint.list(
      page,
      filters,
      (response) => {
        if (response.data.next === null) {
          this.state.hasMoreAds = false;
        }

        let newAds = response.data.results;

        for (let i in newAds) {
          newAds[i].key = newAds[i].id.toString();
        }

        this.extendAds(newAds);
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
          // keyExtractor={(item) => {item.id} /* Tell react native to use the id field as the key prop */}
          renderItem={this.renderItem}
          onEndReached={() => {
            if (this.state.hasMoreAds) {
              this.state.page += 1;
              this.fetchAds(this.state.page, {});
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
