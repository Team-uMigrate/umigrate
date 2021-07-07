import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import ProfilePhotoView from './ProfilePhotoView';
import { IconButton } from 'react-native-paper';

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
          <ProfilePhotoView photo={profile_photo} size={40} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{preferred_name}</Text>
        </View>
        <View>
          <IconButton
            icon="message"
            style={styles.iconButton}
            size={Platform.OS === 'android' ? 10 : 25}
            onPress={() => console.log('Pressed')}
          />
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
    marginLeft: 20,
    flex: 1,
    padding: 10,
  },

  contentContainer: {
    flex: 5.5,
    padding: 10,
  },

  iconButton: {
    alignSelf: 'center',
    marginBottom: '-15%',
    paddingTop: 10,
    marginRight: 20,
  },

  text: {
    paddingTop: 10,
    fontSize: 15,
  },
});
