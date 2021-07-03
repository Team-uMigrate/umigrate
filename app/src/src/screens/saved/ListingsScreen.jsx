import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import Header from '../../components/views/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { routes } from '../../utils/routes';
import { ListingsEndpoint } from '../../utils/endpoints';
import ListingView from '../../components/views/ListingView';
import SavedContainer from '../../components/containers/SavedContainer';

// A screen that renders saved listings of user
const ListingsScreen = ({ navigation }) => {
  // function to go navigate back to savedHome screen from savedListings screen
  const savedHomeRedirect = () => {
    navigation.navigate(routes.savedHome);
  };

  const endpoints = [ListingsEndpoint];
  const itemViews = [(item) => <ListingView {...item} />];

  return (
    <View style={styles.container}>
      {/*<Header title="ListingsScreen" isSavedPostsPage={true} />*/}
      <Appbar.Header
        style={{ backgroundColor: '#ffffff' }}
        statusBarHeight={getStatusBarHeight(true)}
      >
        <Appbar.Action
          color="#555555"
          icon={'arrow-left'}
          onPress={savedHomeRedirect}
        />
        <Text style={styles.title}>Saved Listings</Text>
      </Appbar.Header>

      <SavedContainer
        name="listings"
        endpoints={endpoints}
        itemViews={itemViews}
      />
    </View>
  );
};

export default ListingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  title: {
    fontSize: 17,
  },
});
