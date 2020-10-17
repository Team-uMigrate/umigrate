import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import CommentBarButtons from "./CommentBarButtons";

/*
To add the comment bar to your components, you need to pass in 2 callback functions:
    1. likePost, which makes the HTTP request to the appropriate like endpoint
    2. createComment, which makes the HTTP request to the appropriate comment endpoint
See src/components/Housing/Listings/ListingsContainer.jsx for an example
 */
const CommentBar = ({ postId, isLiked, likePost, createComment }) => {
  const [text, setText] = useState("");
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
        placeholder={"Comment..."}
        placeholderTextColor={"#636363"}
        backgroundColor={"#EBEBEB"}
        onFocus={() => {
          setSendButtonVisible(true);
        }}
        onEndEditing={() => {
          if (text == "") setSendButtonVisible(false);
        }}
        style={styles.textInput}
      />
      <CommentBarButtons
        postId={postId}
        sendButtonVisible={sendButtonVisible}
        setSendButtonVisible={setSendButtonVisible}
        likePost={likePost}
        isLiked={isLiked}
        createComment={createComment}
        text={text}
        setText={setText}
      />
    </View>
  );
};

export default CommentBar;

const styles = StyleSheet.create({
  commentBarContainer: {
    flexDirection: "row",
    alignItems: "center",
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
