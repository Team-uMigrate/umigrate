import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import Header from '../../components/views/Header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { routes } from '../../utils/routes';
import { AdsEndpoint } from '../../utils/endpoints';
import AdView from '../../components/views/AdView';
import SavedContainer from '../../components/containers/SavedContainer';

// A screen that renders saved ads of user
const AdsScreen = ({ navigation }) => {
  // function to go navigate back to savedHome screen from savedAds screen
  const savedHomeRedirect = () => {
    navigation.navigate(routes.savedHome);
  };

  const endpoints = [AdsEndpoint];
  const itemViews = [(item) => <AdView {...item} />];

  return (
    <View style={styles.container}>
      {/*<Header title="AdsScreen" isSavedPostsPage={true} />*/}
      <Appbar.Header
        style={{ backgroundColor: '#ffffff' }}
        statusBarHeight={getStatusBarHeight(true)}
      >
        <Appbar.Action
          color="#555555"
          icon={'arrow-left'}
          onPress={savedHomeRedirect}
        />
        <Text style={styles.title}>Saved Ads</Text>
      </Appbar.Header>

      <SavedContainer name="ads" endpoints={endpoints} itemViews={itemViews} />
    </View>
  );
};

export default AdsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  title: {
    fontSize: 17,
  },
});
