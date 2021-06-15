import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Button,
} from 'react-native';
import FeedContainerHeader from '../common/FeedContainerHeader';
import TabNavContext from '../../contexts/TabNavContext';
import SearchResults from './SearchResults';

class FeedContainer extends Component {
  static contextType = TabNavContext;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      nextPages: props.endpoints.map(() => 1),
      errorMessages: [],
      refreshing: false,
      searching: false,
    };
  }

  componentDidMount = async () => {
    await this.fetchItems();
  };

  updateItem = (item) => {
    const index = this.state.items.findIndex(
      (obj) => obj.id === item.id && obj.type === item.type
    );
    const copiedItems = JSON.parse(JSON.stringify(this.state.items));

    copiedItems[index] = item;
    this.setState({ items: copiedItems });
  };

  fetchItems = async () => {
    // Retrieve state and props
    const { items, nextPages, errorMessages } = this.state;
    const { endpoints, filtersList } = this.props;

    // Fetch a list of items from each endpoint
    let responseDataList = [];
    for (let i = 0; i < endpoints.length; i++) {
      try {
        responseDataList[i] = (
          await endpoints[i].list(nextPages[i], filtersList[i])
        ).data;
      } catch (error) {
        // Append error messages to state
        this.setState({
          errorMessages: [...errorMessages, JSON.stringify(error)],
        });
        return;
      }
    }

    // Find the max end date between the results from all endpoints
    let maxEndDate = 0;
    responseDataList.forEach((responseData) => {
      maxEndDate = Math.max(
        maxEndDate,
        Date.parse(
          responseData.results[responseData.results.length - 1]
            ?.datetime_created
        ) ?? null
      );
    });

    let newItems = this.state.refreshing ? [] : items;
    let newNextPages = nextPages;

    responseDataList.forEach((responseData, t) => {
      // Set next pages
      if (
        Date.parse(
          responseData.results[responseData.results.length - 1]
            ?.datetime_created
        ) >= maxEndDate &&
        responseData.next
      ) {
        newNextPages[t] = nextPages[t] + 1;
      }

      // Add results from each endpoint to items
      newItems = newItems.concat(
        responseData.results
          // Filter out items created before max end date and duplicate items
          .filter(
            (item) =>
              Date.parse(item.datetime_created) >= maxEndDate &&
              !items.find((stateItem) => {
                return stateItem.id === item.id && stateItem.type === t;
              })
          )
          // Add type to each item
          .map((item) => ({ ...item, type: t }))
      );
    });

    // Sort items by date and time created descending
    newItems = newItems.sort(
      (a, b) => Date.parse(b.datetime_created) - Date.parse(a.datetime_created)
    );

    // Update state
    this.setState({ items: newItems, nextPages: newNextPages });
  };

  handleRefresh = () => {
    // Set state to refreshing
    this.setState(
      {
        items: [],
        nextPages: this.state.nextPages.map(() => 1),
        errorMessages: [],
        refreshing: true,
      },
      async () => {
        // Fetch items
        await this.fetchItems();
        // Set state to not refreshing
        this.setState({ refreshing: false });
      }
    );
  };

  renderItem = ({ item }) => {
    return this.props.itemViews[item.type]({
      ...item,
      updateItem: this.updateItem,
    });
  };

  searchingState = () => {
    this.setState({ searching: !this.state.searching });
  };

  render() {
    if (this.state.searching === true) {
      return (
        // TODO: Fix this margin... its not dynammic enough
        <View style={{ marginBottom: '45%' }}>
          <SearchResults searchingState={this.searchingState}></SearchResults>
        </View>
      );
    } else {
      return (
        <View style={styles.feedContainer}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            }
            data={this.state.items}
            keyExtractor={(item, i) => i.toString()}
            renderItem={this.renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={this.fetchItems}
            showsVerticalScrollIndicator={false}
            ref={this.props.scrollRef}
            ListHeaderComponent={
              <FeedContainerHeader
                page_name={this.props.route.name}
                searchingState={this.searchingState}
              />
            }
          />
        </View>
      );
    }
  }
}

export default FeedContainer;

const styles = StyleSheet.create({
  feedContainer: {
    flexDirection: 'column',
    marginBottom: '15%', // To make sure a bit of the bottom post isn't cut off
  },
});
