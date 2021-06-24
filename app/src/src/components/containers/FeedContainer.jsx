import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Text,
  ActivityIndicator,
} from 'react-native';
import FeedHeader from '../common/FeedHeader';
import { fetchAndMergeData } from '../../utils/fetchDataHelpers';

class FeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      nextPages: this.props.getItemsSet.map(() => 1),
      isRefreshing: false,
      isFetching: false,
      hasMorePages: true,
      errors: [],
    };
  }

  componentDidMount = () => {
    // Fetch items
    this.fetchItems();
  };

  updateItem = (item) => {
    const index = this.state.items.findIndex(
      (obj) => obj.id === item.id && obj.type === item.type
    );
    const copiedItems = JSON.parse(JSON.stringify(this.state.items));

    copiedItems[index] = item;
    this.setState({ items: copiedItems });
  };

  fetchItems = () => {
    // Exit if already fetching
    if (this.state.isFetching) return;

    // Set state to fetching
    this.setState({ isFetching: true }, async () => {
      // Fetch and merge data into newItems list
      const { newItems, newNextPages, errors } = await fetchAndMergeData(
        this.state.items,
        this.props.getItemsSet,
        this.state.nextPages,
        this.props.filtersList,
        this.state.isRefreshing
      );

      // Update state
      this.setState({
        items: newItems,
        nextPages: newNextPages,
        isRefreshing: false,
        isFetching: false,
        hasMorePages: this.state.items.length !== newItems.length,
        errors: errors,
      });
    });
  };

  handleRefresh = () => {
    // Exit if already refreshing
    if (this.state.isRefreshing) return;

    // Set state to refreshing
    this.setState(
      {
        items: [],
        nextPages: this.state.nextPages.map(() => 1),
        isRefreshing: true,
        isFetching: false,
        hasMorePages: true,
        errors: [],
      },
      () => {
        // Fetch items
        this.fetchItems();
      }
    );
  };

  renderItem = ({ item }) => {
    return this.props.itemViews[item.type]({
      ...item,
      updateItem: this.updateItem,
    });
  };

  render() {
    if (this.state.errors.length) {
      return (
        <>
          {this.state.errors.map((e, i) => (
            <Text key={i.toString()}>{JSON.stringify(e)}</Text>
          ))}
        </>
      );
    }
    return (
      <View style={styles.feedContainer}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.handleRefresh}
            />
          }
          data={this.state.items}
          keyExtractor={(item, i) => i.toString()}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={this.state.hasMorePages && this.fetchItems}
          showsVerticalScrollIndicator={false}
          ref={this.props.scrollRef}
          ListHeaderComponent={
            this.props.feedName && <FeedHeader feedName={this.props.feedName} />
          }
          ListFooterComponent={
            !this.state.isRefreshing &&
            this.state.isFetching && (
              <ActivityIndicator size="large" style={{ padding: 10 }} />
            )
          }
        />
      </View>
    );
  }
}

export default FeedContainer;

const styles = StyleSheet.create({
  feedContainer: {
    flexDirection: 'column',
    marginBottom: '15%', // To make sure a bit of the bottom post isn't cut off
  },
});
