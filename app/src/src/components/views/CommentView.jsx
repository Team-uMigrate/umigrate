import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import ProfilePhotoView from './ProfilePhotoView';
import { ReplyContainer } from '../containers/ReplyContainer';

const CommentView = ({ id, datetime_created, creator, content }) => {
  // The dateTime string looks like this: 2020-11-02T23:49:23.846475Z
  const date = datetime_created.substring(0, 'YYYY-MM-DD'.length);
  const time = datetime_created.substring(
    'YYYY-MM-DDT'.length,
    'YYYY-MM-DDTHH:MM'.length
  );

  return (
    <View style={styles.commentView}>
      <View style={{ flexDirection: 'row' }}>
        {/* Pushes the user's name forward so it lines up with the content */}
        <View style={{ flex: 1 }} />
        <View style={{ flex: 6 }}>
          <Text style={{ fontSize: 12.5 }}>{creator.preferred_name}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginRight: '2.5%', flex: 1 }}>
          <ProfilePhotoView photo={creator.profile_photo} size={30} />
        </View>
        <View style={styles.contentContainer}>
          <Text>{content}</Text>
        </View>
        <View style={styles.timestampView}>
          <Text style={styles.timestamp}>{date + '\n' + time}</Text>
        </View>
      </View>

      <ReplyContainer commentId={id} />
    </View>
  );
};

export default CommentView;

const styles = StyleSheet.create({
  commentView: {
    flex: 1,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  contentContainer: {
    borderRadius: 20,
    backgroundColor: '#EBEBEB',
    flex: 6,
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
