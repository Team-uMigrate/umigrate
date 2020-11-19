import React, { Component } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import AdView from './AdView';
import { AdsEndpoint } from '../../../utils/endpoints';

class AdsContainer extends Component {
  state = {
    ads: [],
    nextPage: 1,
    filters: {},
    hasNewAds: false,
    nextPageExists: true,
    refreshing: false,
  };

  componentDidMount = () => {
    this.getAds();
  };

  wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  onRefresh = () => {
    this.setState({
      refreshing: true,
      nextPage: 1,
    });

    this.refreshAds();

    this.wait(1200).then(() => {
      this.setState({ refreshing: false });
    });
  };

  // getting of posts when refreshing
  // (resets post list to most recent ones)

  refreshAds = () => {
    AdsEndpoint.list(
      1,
      this.state.filters,
      (response) => {
        this.setState({
          ads: [],
        });
        this.setState({
          ads: response.data.results,
          hasNewAds: true,
          nextPageExists: response.data.next !== null,
        });
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  };

  getAds = () => {
    AdsEndpoint.list(
      this.state.nextPage,
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
          nextPage: nextPageExists
            ? this.state.nextPage + 1
            : this.state.nextPage,
          nextPageExists: nextPageExists,
        });
      },
      (error) => {
        console.log('error: ', error);
      }
    );
  };

  renderItem = ({ item }) => {
    return <AdView {...item} />;
  };

  render() {
    return (
      <View style={styles.adsContainer}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          data={this.state.ads}
          keyExtractor={(item, i) => i.toString()}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.state.nextPageExists) {
              this.getAds();
            }
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

export default AdsContainer;

const styles = StyleSheet.create({
  adsContainer: {
    flexDirection: 'column',
    marginBottom: '15%', // To make sure a bit of the bottom post isn't cut off
  },
});
