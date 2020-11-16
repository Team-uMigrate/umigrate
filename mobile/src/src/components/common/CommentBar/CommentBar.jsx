import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import CommentBarButtons from './CommentBarButtons';

/*
To add the comment bar to your components, you need to pass in the callback function
likePost, which makes the HTTP request to the appropriate like endpoint.
See src/components/Housing/Listings/ListingsContainer.jsx for an example.

Note that you also need a contentType prop. This refers to the numeric type of
the content you're attaching this commentBar to (e.g. the number for listings is, at
the time of writing this, 15). You can use the map in the Choices class of endpoints.js
to pass in the right number.

The other props are self-explanatory enough.
 */
const CommentBar = ({ postId, contentType, isLiked, region, likePost }) => {
  const [text, setText] = useState('');
  const [sendButtonVisible, setSendButtonVisible] = useState(false);

  return (
    <View style={styles.commentBarContainer}>
      <TextInput
        value={text}
        clearTextOnFocus={true}
        autoCorrect={true}
        multiline={true}
        scrollEnabled={true}
        onChangeText={setText}
        placeholder={'Comment...'}
        placeholderTextColor={'#636363'}
        backgroundColor={'#EBEBEB'}
        onFocus={() => {
          setSendButtonVisible(true);
        }}
        onEndEditing={() => {
          if (text == '') setSendButtonVisible(false);
        }}
        style={styles.textInput}
      />
      <CommentBarButtons
        postId={postId}
        contentType={contentType}
        sendButtonVisible={sendButtonVisible}
        setSendButtonVisible={setSendButtonVisible}
        likePost={likePost}
        isLiked={isLiked}
        text={text}
        setText={setText}
        region={region}
      />
    </View>
  );
};

export default CommentBar;

const styles = StyleSheet.create({
  commentBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textInput: {
    flex: 9,
    borderRadius: 30,
    paddingLeft: 16,
    paddingRight: 6,
    paddingTop: 2,
    paddingBottom: 2,
  },
});
