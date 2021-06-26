import React, { Component } from 'react';
import { Text, ActivityIndicator, VirtualizedList } from 'react-native';
import FeedHeader from '../common/FeedHeader';
import { fetchAndMergeItemsLists } from '../../utils/fetchDataHelpers';
import PropsType from 'prop-types';

/**
 * A React component that renders a list of items fetched from different API endpoints.
 */
class FeedContainer extends Component {
  static propTypes = {
    /** An array of asynchronous functions that each return an AxiosResponse. Used to fetch each list of items. */
    fetchItemsList: PropsType.arrayOf(PropsType.func).isRequired,
    /** An array of functions that each return JSX. Used to render an item from each list. */
    itemViews: PropsType.arrayOf(PropsType.func).isRequired,
    /** An array of filter objects. Used to filter each list of items. */
    filtersList: PropsType.arrayOf(PropsType.object).isRequired,
    /** A ref that was passed to the useScrollToTop hook.
     * Used to scroll to the top of the FlatList. */
    scrollRef: PropsType.object.isRequired,
    /** A string representing the name of the feed container. Is optional. */
    feedName: PropsType.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      nextPages: this.props.fetchItemsList.map(() => 1),
      isRefreshing: false,
      isFetching: false,
      hasMorePages: true,
      errors: [],
    };
  }

  componentDidMount = () => {
    // Fetch items when mounted
    this.fetchItems();
  };

  /** Fetches items from the API. */
  fetchItems = () => {
    // Exit if already fetching
    if (this.state.isFetching) return;

    // Set state to fetching
    this.setState({ isFetching: true }, async () => {
      // Fetch and merge data into newItems list
      const { newItems, newNextPages, errors } = await fetchAndMergeItemsLists(
        this.state.isRefreshing ? [] : this.state.items,
        this.props.fetchItemsList,
        this.state.nextPages,
        this.props.filtersList
      );

      // Update state with new items
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

  /** Updates an item in the state. */
  updateItem = (item) => {
    // Find the index of the item to replace in the state
    const index = this.state.items.findIndex(
      (obj) => obj.id === item.id && obj.type === item.type
    );
    // Perform a shallow copy of the items
    const copiedItems = [...this.state.items];
    // Update the item
    copiedItems[index] = item;
    // Update the state with the copied list
    this.setState({ items: copiedItems });
  };

  /** Refreshes the feed. */
  handleRefresh = () => {
    // Exit if already refreshing
    if (this.state.isRefreshing) return;

    // Set state to refreshing and reset other state properties
    this.setState(
      {
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

  /** Renders an item. */
  renderItem = ({ item }) => {
    // Use an itemView to render the item
    return this.props.itemViews[item.type](item, this.updateItem);
  };

  render() {
    if (this.state.errors.length) {
      // Display any errors
      return (
        <>
          {this.state.errors.map((e, i) => (
            <Text key={i.toString()}>{JSON.stringify(e)}</Text>
          ))}
        </>
      );
    }
    return (
      <VirtualizedList
        ListHeaderComponent={
          this.props.feedName && <FeedHeader feedName={this.props.feedName} />
        }
        data={this.state.items}
        getItem={(data, i) => data[i]}
        getItemCount={(data) => data.length}
        renderItem={this.renderItem}
        keyExtractor={(item, i) => i.toString()}
        onEndReached={this.state.hasMorePages && this.fetchItems}
        onEndReachedThreshold={0.5}
        refreshing={this.state.isRefreshing}
        onRefresh={this.handleRefresh}
        ref={this.props.scrollRef}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          !this.state.isRefreshing &&
          this.state.isFetching && (
            <ActivityIndicator size="large" style={{ padding: 10 }} />
          )
        }
      />
    );
  }
}

export default FeedContainer;
