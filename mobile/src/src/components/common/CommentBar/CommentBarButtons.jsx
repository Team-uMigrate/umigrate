import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';

const CommentBarButtons = ({
  postId,
  contentType,
  sendButtonVisible,
  setSendButtonVisible,
  likePost,
  sendComment,
  isLiked,
  text,
  setText,
  region,
}) => {
  const [liked, setLiked] = useState(isLiked);
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
          onPress={() => {
            if (text !== '') {
              // TODO add location and ability to tag users
              let data = {
                content: text,
                object_id: postId,
                content_type: contentType,
                region: region,
                tagged_users: [],
              };
              sendComment(data);
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
          <IconButton
            // TODO: Update design to match figma
            icon={'heart'}
            color={liked ? 'red' : 'black'}
            style={styles.button}
            onPress={() => {
              likePost(postId, !liked);
              setLiked(!liked);
            }}
          />
        </View>
        {/* Button to view comments */}
        <View>
          <IconButton
            icon={'comment'}
            color={'black'}
            style={styles.button}
            onPress={() => {
              setSendButtonVisible(true);
            }}
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
    height: 25,
  },
  sendButton: {
    alignSelf: 'center',
    height: 30,
  },
});
