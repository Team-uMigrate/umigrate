import { ListingsEndpoint, PostsEndpoint } from '../../utils/endpoints';
import ListingView from '../../components/views/ListingView';
import React, { useRef, useContext, useState } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/views/Header';
import FeedContainer from '../../components/containers/FeedContainer';
import CreateItemModal from '../../components/modals/CreateItemModal';
import StackNavContext from '../../contexts/StackNavContext';
import { sharedLikesCommentsstyles } from '../../stylesheets/likesAndComments/likesAndComments.jsx';
import { StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigations/native';
import UserView from '../../components/views/UserView';
import { IconButton, Searchbar } from 'react-native-paper';

const itemViews = [
  (item, updateItem) => <UserView item={item} updateItem={updateItem} />,
];

/**
 * Renders the likes screen.
 * @param {StackNavigationProp} navigation
 * @param {RouteProp} route
 * @return {JSX.Element}
 * */

const LikesScreen = ({ navigation, route }) => {
  const fetchItemsList = [
    async (page, filters) =>
      await PostsEndpoint.likes(route.params['postId'], page),
  ];

  const nav = useContext(StackNavContext);

  const ref = useRef(null);

  useScrollToTop(ref);

  return (
    <>
      <View style={sharedLikesCommentsstyles.container}>
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            icon="arrow-left"
            style={styles.button}
            size={20}
            onPress={() => nav.navigation.goBack()}
          />
          <Text style={styles.text}>Liked Users</Text>
        </View>
        <View>
          <Searchbar
            placeholder="Search"
            placeholderTextColor="lightgray"
            iconColor="darkgray"
            onChangeText={(typed) => {
              if (typed.length == 0) {
                text_filter_default();
              } else {
                delayedQuery(typed);
              }
            }}
            style={styles.searchBar}
          ></Searchbar>
        </View>
        <FeedContainer
          fetchItemsList={fetchItemsList}
          itemViews={itemViews}
          filtersList={[]}
          scrollRef={ref}
        />
        <CreateItemModal navigation={navigation} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 27,
    marginTop: 60,
    marginLeft: 40,
  },

  button: {
    color: 'black',
    marginTop: 62,
    marginLeft: 10,
  },

  searchBar: {
    borderColor: 'lightgray',
    borderWidth: 1,
    marginTop: 10,
    height: 35,
    width: 355,
    alignSelf: 'center',
    borderRadius: 7,
    elevation: 0,
  },
});

export default LikesScreen;
