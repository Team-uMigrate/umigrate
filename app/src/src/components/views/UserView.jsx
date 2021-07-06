import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import ProfilePhotoView from './ProfilePhotoView';
import { sharedLikesCommentsstyles } from '../../stylesheets/likesAndComments/likesAndComments.jsx';

/**
 * Renders a User.
 * @param {object} item
 * @param {function(object): void} updateItem
 * @return {JSX.Element}
 */
const UserView = ({ item, updateItem }) => {
  const { preferred_name, profile_photo } = item;

  return (
    <View style={styles.listView}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.profilePhotoView}>
          <ProfilePhotoView photo={profile_photo} size={30} />
        </View>
        <View style={styles.contentContainer}>
          <Text>{preferred_name}</Text>
        </View>
      </View>
    </View>
  );
};

export default UserView;

const styles = StyleSheet.create({
  listView: {
    marginTop: 10,
  },

  profilePhotoView: {
    marginRight: 5,
    flex: 1,
    padding: 10,
  },

  contentContainer: {
    flex: 5.5,
    padding: 10,
  },
});
