import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

const CommentBarButtons = ({
  postId,
  sendButtonVisible,
  setSendButtonVisible,
  likePost,
  createComment,
  isLiked,
  text,
  setText,
}) => {
  const [liked, setLiked] = useState(isLiked);

  if (sendButtonVisible) {
    return (
      <View style={styles.sendButtonView}>
        <IconButton
          icon={"send"}
          style={styles.sendButton}
          color={"white"}
          onPress={() => {
            if (text !== "") {
              createComment(postId, text, []); // TODO add ability to tag users
              setText("");
              setSendButtonVisible(false);
            }
          }}
        />
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.buttonView}>
          <IconButton
            icon={"heart"}
            color={liked ? "red" : "black"}
            style={styles.button}
            onPress={() => {
              likePost(postId, !liked);
              setLiked(!liked);
              // TODO Refresh the number of likes displayed in the view this attached to when the post is liked
            }}
          />
        </View>
        <View style={styles.buttonView}>
          <IconButton icon={"comment"} color={"black"} style={styles.button} />
        </View>
      </>
    );
  }
};

export default CommentBarButtons;

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    alignContent: "center",
  },
  sendButtonView: {
    flex: 2,
    marginLeft: 10,
    marginRight: 5,
    alignContent: "center",
    backgroundColor: "#47e9ff",
    borderRadius: 20,
  },
  button: {
    height: 20,
  },
  sendButton: {
    alignSelf: "center",
    height: 20,
    padding: 5,
  },
});
