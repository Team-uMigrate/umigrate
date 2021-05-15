import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { CommentsEndpoint } from '../../utils/endpoints';

const CommentBarButtons = ({
  item,
  endpoint,
  contentType,
  sendButtonVisible,
  setSendButtonVisible,
  text,
  liked,
  setText,
}) => {
  const windowWidth = Dimensions.get('window').width;

  if (sendButtonVisible) {
    return (
      // Button to submit comments
      <View style={styles.sendButtonView}>
        <IconButton
          icon={'send'}
          style={styles.sendButton}
          color={'#FF668B'}
          size={35}
          onPress={async () => {
            if (text !== '') {
              // TODO add location and ability to tag users
              let data = {
                content: text,
                object_id: item.id,
                content_type: contentType,
                tagged_users: [],
              };
              await CommentsEndpoint.post(data);
              item.updateItem({ ...item, comments: item.comments + 1 });
              setText('');
              setSendButtonVisible(false);
            }
          }}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 'auto',
        }}
      >
        {/* Like button */}
        <View style={styles.buttonView}>
          <MaterialCommunityIcons
            name={liked ? 'heart' : 'heart-outline'}
            color={liked ? 'red' : 'purple'}
            style={styles.button}
            onPress={async () => {
              await endpoint.like(item.id, !liked);
              item.updateItem({
                ...item,
                is_liked: !liked,
                likes: liked ? item.likes - 1 : item.likes + 1,
              });
            }}
          />
        </View>
        {/* Button to view comments */}
        <View style={styles.buttonView}>
          <MaterialCommunityIcons
            name="chat-outline"
            color={'purple'}
            style={styles.button}
            onPress={() => {
              setSendButtonVisible(true);
            }}
          />
        </View>
        <View style={styles.buttonView}>
          <MaterialCommunityIcons
            name="bookmark-outline"
            style={styles.button}
            color={'purple'}
          />
        </View>
      </View>
    );
  }
};

export default CommentBarButtons;

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  sendButtonView: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
    marginLeft: 20,
  },
  button: {
    fontSize: 30,
    paddingLeft: '3%',
  },
  sendButton: {
    alignSelf: 'center',
    height: 30,
  },
});
