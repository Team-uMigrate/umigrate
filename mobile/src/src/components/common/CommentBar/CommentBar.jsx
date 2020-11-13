import React, { useState, useContext } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import CommentBarButtons from "./CommentBarButtons";
import NavContext from "../../../contexts/NavContext";

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
const CommentBar = ({
  postId,
  contentType,
  isLiked,
  region,
  likePost,
  sendComment,
  likes,
  comments,
}) => {
  const [text, setText] = useState("");
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
          contentType={contentType}
          sendButtonVisible={sendButtonVisible}
          setSendButtonVisible={setSendButtonVisible}
          sendComment={sendComment}
          likePost={likePost}
          isLiked={isLiked}
          text={text}
          setText={setText}
          region={region}
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
            {"Likes (" + likes + ")"}
          </Text>
          <Text
            onPress={() => {
              nav.navigation.navigate("Comments", {
                postId: postId,
                contentType: contentType,
              });
            }}
            style={styles.commentsText}
          >
            {" Comments (" + comments + ")"}
          </Text>
        </View>
        <CommentBarButtons
          postId={postId}
          contentType={contentType}
          sendButtonVisible={sendButtonVisible}
          setSendButtonVisible={setSendButtonVisible}
          sendComment={sendComment}
          likePost={likePost}
          isLiked={isLiked}
          text={text}
          setText={setText}
          region={region}
        />
      </View>
    );
  }
};

export default CommentBar;

const styles = StyleSheet.create({
  commentBarContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 10,
  },
  likesAndCommentsText: {
    flexDirection: "row",
    marginRight: "auto",
    marginBottom: 10,
    marginTop: 16,
  },
  likesText: {
    // TODO: Enable Montserrat font
    // fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 16,
    display: "flex",
    alignItems: "center",
    letterSpacing: 0.5,
    color: "#404040",
  },
  commentsText: {
    // TODO: Enable Montserrat font
    // fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 12,
    lineHeight: 16,
    display: "flex",
    alignItems: "center",
    letterSpacing: 0.5,
    color: "#404040",
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
    textAlignVertical: "center",
  },
});
