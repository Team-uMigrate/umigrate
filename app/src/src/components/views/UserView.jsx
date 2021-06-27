import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import ProfilePhotoView from './ProfilePhotoView';

/**
 * Renders a User.
 * @param {object} item
 * @param {function(object): void} updateItem
 * @return {JSX.Element}
 */
const UserView = ({ item, updateItem }) => {
  const { preferred_name, profile_photo } = item;

  return (
    <View style={styles.ListBegin}>
      <Text style={styles.text}>{preferred_name}</Text>
      <ProfilePhotoView photo="http://dev.umigrate.ca/media/images/photos/Salute.PNG" />
    </View>
  );
};

export default UserView;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    marginTop: 44,
  },
});
