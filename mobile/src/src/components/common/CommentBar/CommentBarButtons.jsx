import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import NavContext from '../../../contexts/NavContext';
import { Choices, CommentsEndpoint } from '../../../utils/endpoints';

const CommentBarButtons = ({
  postId,
  contentType,
  sendButtonVisible,
  setSendButtonVisible,
  likePost,
  isLiked,
  text,
  setText,
  region,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const nav = useContext(NavContext);

  if (sendButtonVisible) {
    return (
      // Button to submit comments
      <View style={styles.sendButtonView}>
        <IconButton
          icon="send"
          style={styles.sendButton}
          color="white"
          onPress={() => {
            if (text !== '') {
              // TODO add location and ability to tag users
              const data = {
                content: text,
                object_id: postId,
                content_type: contentType,
                region,
                tagged_users: [],
              };

              CommentsEndpoint.post(
                data,
                () => {},
                (error) => {
                  console.log(error);
                },
              );

              setText('');
              setSendButtonVisible(false);
            }
          }}
        />
      </View>
    );
  }
  return (
    <>
      {/* Like button */}
      <View style={styles.buttonView}>
        <IconButton
          icon="heart"
          color={liked ? 'red' : 'black'}
          style={styles.button}
          onPress={() => {
            likePost(postId, !liked);
            setLiked(!liked);
            // TODO Refresh the number of likes displayed in the view this attached to when the post is liked
          }}
        />
      </View>
      {/* Button to view comments */}
      <View style={styles.buttonView}>
        <IconButton
          icon="comment"
          color="black"
          style={styles.button}
          onPress={() => {
            nav.navigation.navigate('Comments', {
              postId,
              contentType,
            });
          }}
        />
      </View>
    </>
  );
};

export default CommentBarButtons;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    alignContent: 'center',
  },
  sendButtonView: {
    flex: 2,
    marginLeft: 10,
    marginRight: 5,
    alignContent: 'center',
    backgroundColor: '#47e9ff',
    borderRadius: 20,
  },
  button: {
    height: 20,
  },
  sendButton: {
    alignSelf: 'center',
    height: 20,
    padding: 5,
  },
});
