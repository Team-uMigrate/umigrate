import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import ProfilePhotoView from '../views/ProfilePhotoView';
import testImage from '../../screens/saved/tree-276014__340.jpg';

class SavedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      nextPages: props.endpoints.map(() => 1),
      errorMessages: [],
      refreshing: false,
      name: props.name,
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
    const { endpoints } = this.props;

    // Fetch a list of items from each endpoint
    let responseDataList = [];
    for (let i = 0; i < endpoints.length; i++) {
      try {
        responseDataList[i] = (await endpoints[i].saved(nextPages[i])).data;
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
    console.log('we are on screen: ' + this.state.name);
    console.log('item.title: ' + item.title + item.title.length);
    let title = '';

    if (this.state.name == 'Posts' || this.state.name == 'Events') {
      for (let i = 0; i < 12; i++) {
        if (i > item.title.length) {
          i = 13;
        } else {
          title = title + item.title[i];
        }
      }
      if (item.title.length >= 13) {
        title = title + '...';
      }
    } else if (this.state.name == 'Ads') {
      console.log(item.is_buying);
      if (item.is_buying == true) {
        title = 'Sold: ';
        for (let i = 0; i < 8; i++) {
          if (i > item.title.length) {
            i = 9;
          } else {
            title = title + item.title[i];
          }
        }
        if (item.title.length > 14) {
          title = title + '...';
        }
      } else {
        title = 'Available: ';
        for (let i = 0; i < 3; i++) {
          if (i > item.title.length) {
            i = 4;
          } else {
            title = title + item.title[i];
          }
        }
        if (item.title.length > 14) {
          title = title + '...';
        }
      }
    } else if (this.state.name == 'Listings') {
      console.log(item.confirmed_users);
      if (item.confirmed_users.length) {
        title = 'Sold: ';
        for (let i = 0; i < 7; i++) {
          if (i > item.title.length) {
            i = 8;
          } else {
            title = title + item.title[i];
          }
        }
        if (item.title.length >= 13) {
          title = title + '...';
        }
      } else {
        title = 'Available: ';
        for (let i = 0; i < 3; i++) {
          if (i > item.title.length) {
            i = 4;
          } else {
            title = title + item.title[i];
          }
        }
        if (item.title.length > 14) {
          title = title + '...';
        }
      }
    }

    return (
      <Card style={styles.row}>
        {/*<ImageBackground source={item.photos} style={{paddingBottom: 95}} imageStyle={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>*/}
        <ImageBackground
          source={testImage}
          style={{ paddingBottom: 95 }}
          imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        >
          <Card.Content>
            <View style={{ marginLeft: 0, marginTop: 5 }}>
              <ProfilePhotoView photo={item.creator.profile_photo} size={20} />
            </View>
            <Paragraph style={styles.footer}>{title}</Paragraph>
          </Card.Content>
        </ImageBackground>
      </Card>
    );
  };

  render() {
    return (
      <View>
        {this.state.items.length ? (
          <View style={styles.savedContainer}>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleRefresh}
                />
              }
              data={this.state.items}
              numColumns={2}
              style={styles.flatList}
              keyExtractor={(item, i) => i.toString()}
              renderItem={this.renderItem}
              onEndReachedThreshold={0.5}
              onEndReached={this.fetchItems}
              showsVerticalScrollIndicator={false}
              ref={this.props.scrollRef}
            />
          </View>
        ) : (
          <View>
            <Paragraph style={styles.empty}>
              Sorry, No items to display!!
            </Paragraph>
          </View>
        )}
      </View>
    );
  }
}

export default SavedContainer;

const styles = StyleSheet.create({
  savedContainer: {
    flexDirection: 'column',
    marginBottom: '15%',
  },
  flatList: {
    margin: '2%',
  },
  row: {
    margin: '1%',
    marginTop: '2%',
    flex: 4,
    height: 150,
    borderRadius: 20,
  },
  footer: {
    position: 'absolute',
    top: 120,
    textAlign: 'left',
    marginLeft: '11%',
  },
  singleItem: {
    marginTop: '1%',
    color: 'red',
  },
  empty: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: '10%',
  },
});
