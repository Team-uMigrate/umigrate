import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ProfilePhotoView from './ProfilePhotoView';

/**
 * Renders a reply.
 * @param {object} item
 * @param {function(object): void} updateItem
 * @return {JSX.Element}
 */
const ReplyView = ({ item, updateItem }) => {
  const { datetime_created, creator, content } = item;
  // The dateTime string looks like this: 2020-11-02T23:49:23.846475Z
  const date = datetime_created.substring(0, 10);
  const time = datetime_created.substring(11, 16);

  return (
    <View style={styles.replyView}>
      {/* The user's name */}
      <View style={{ flexDirection: 'row' }}>
        {/* Pushes the user's name forward so it lines up with the content */}
        <View style={{ flex: 1 }} />
        <View style={{ flex: 6 }}>
          <Text style={{ fontSize: 12.5 }}>{creator.preferred_name}</Text>
        </View>
      </View>
      {/* Profile photo, text content, and date/time of post creation */}
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.profilePhotoView}>
          <ProfilePhotoView photo={creator.profile_photo} size={30} />
        </View>
        <View style={styles.contentContainer}>
          <Text>{content}</Text>
        </View>
        <View style={styles.timestampView}>
          <Text style={styles.timestamp}>{date + '\n' + time}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReplyView;

const styles = StyleSheet.create({
  profilePhotoView: {
    marginRight: 5,
    flex: 1,
  },
  replyView: {
    marginTop: 10,
  },
  contentContainer: {
    flex: 5.5,
    backgroundColor: '#EBEBEB',
    borderRadius: 15,
    padding: 5,
    paddingLeft: 12,
    paddingRight: 5,
  },
  timestampView: {
    marginLeft: 2,
    alignSelf: 'flex-end',
    flex: 1.5,
  },
  timestamp: {
    color: 'gray',
    fontSize: 10,
    paddingBottom: 5,
  },
});
