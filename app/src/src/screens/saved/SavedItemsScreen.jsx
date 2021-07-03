import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { routes } from '../../utils/routes';
import SavedContainer from '../../components/containers/SavedContainer';
import {
  EventsEndpoint,
  PostsEndpoint,
  ListingsEndpoint,
  AdsEndpoint,
} from '../../utils/endpoints';
import EventView from '../../components/views/EventView';
import PostView from '../../components/views/PostView';
import AdView from '../../components/views/AdView';
import ListingView from '../../components/views/ListingView';

// A screen that renders saved posts/ads/listings/events of user
const SavedItemsScreen = ({ route, navigation }) => {
  const savedHomeRedirect = () => {
    navigation.navigate(routes.savedHome);
  };

  const { type } = route.params;
  let endpoints;
  let itemViews;
  let name;

  switch (type) {
    case 'events':
      endpoints = [EventsEndpoint];
      itemViews = [(item) => <EventView {...item} />];
      name = 'Events';
      break;

    case 'posts':
      endpoints = [PostsEndpoint];
      itemViews = [(item) => <PostView {...item} />];
      name = 'Posts';
      break;

    case 'ads':
      endpoints = [AdsEndpoint];
      itemViews = [(item) => <AdView {...item} />];
      name = 'Ads';
      break;

    case 'listings':
      endpoints = [ListingsEndpoint];
      itemViews = [(item) => <ListingView {...item} />];
      name = 'Listings';
      break;

    default:
      break;
  }

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{ backgroundColor: '#ffffff' }}
        statusBarHeight={getStatusBarHeight(true)}
      >
        <Appbar.Action
          color="#555555"
          icon={'arrow-left'}
          onPress={savedHomeRedirect}
        />
        <Text style={styles.title}>Saved {name}</Text>
      </Appbar.Header>

      <SavedContainer name={name} endpoints={endpoints} itemViews={itemViews} />
    </View>
  );
};

export default SavedItemsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  title: {
    fontSize: 17,
  },
});
