import React, { useState, useContext } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import CommentBarButtons from './CommentBarButtons';
import NavContext from '../../../contexts/NavContext';

/*
To add the comment bar to your components, you need to pass in two callback functions.
They are likePost and sendComment, which makes the HTTP requests to the appropriate like and comment endpoints.
See src/components/Housing/Listings/ListingsContainer.jsx for an example.

Note that you also need a contentType prop. This refers to the numeric type of
the content you're attaching this commentBar to (e.g. the number for listings is, at
the time of writing this, 15). You can use the map in the Choices class of endpoints.js
to pass in the right number.

The other props are self-explanatory enough.
 */
const CommentBar = ({ item, contentType, endpoint }) => {
  const [text, setText] = useState('');
  const [sendButtonVisible, setSendButtonVisible] = useState(false);
  const nav = useContext(NavContext);

  if (sendButtonVisible) {
    return (
      <View style={styles.commentBarContainer}>
        <TextInput
          autoFocus={true}
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
          item={item}
          contentType={contentType}
          endpoint={endpoint}
          sendButtonVisible={sendButtonVisible}
          setSendButtonVisible={setSendButtonVisible}
          text={text}
          setText={setText}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.commentBarContainer}>
        <View style={styles.likesAndCommentsText}>
          <Text
            onPress={() => {
              // TODO : Show who has liked this post onPress
            }}
            style={styles.likesText}
          >
            {'Likes (' + item.likes + ')'}
          </Text>
          <Text
            onPress={() => {
              nav.navigation.navigate('Comments', {
                postId: item.id,
                contentType: contentType,
              });
            }}
            style={styles.commentsText}
          >
            {' Comments (' + item.comments + ')'}
          </Text>
        </View>
        <CommentBarButtons
          item={item}
          contentType={contentType}
          endpoint={endpoint}
          sendButtonVisible={sendButtonVisible}
          setSendButtonVisible={setSendButtonVisible}
          text={text}
          liked={item.is_liked}
          setText={setText}
        />
      </View>
    );
  }
};

export default CommentBar;

const styles = StyleSheet.create({
  commentBarContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  likesAndCommentsText: {
    flexDirection: 'row',
    marginRight: 'auto',
  },
  likesText: {
    // TODO: Enable Montserrat font
    // fontFamily: "Montserrat",
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 16,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 0.5,
    color: '#404040',
  },
  commentsText: {
    // TODO: Enable Montserrat font
    // fontFamily: "Montserrat",
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 16,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 0.5,
    color: '#404040',
    marginLeft: 30,
  },
  textInput: {
    flex: 9,
    borderRadius: 30,
    paddingLeft: 16,
    paddingRight: 6,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 5,
    textAlignVertical: 'center',
  },
});
