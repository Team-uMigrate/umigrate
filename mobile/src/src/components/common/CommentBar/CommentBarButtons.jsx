import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import NavContext from "../../../contexts/NavContext";

const CommentBarButtons = ({
  postId,
  sendButtonVisible,
  setSendButtonVisible,
  likePost,
  createComment,
  isLiked,
  text,
  setText,
  fetchComments,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const nav = useContext(NavContext);

  if (sendButtonVisible) {
    return (
      // Button to submit comments
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
        {/* Like button */}
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
        {/* Button to view comments */}
        <View style={styles.buttonView}>
          <IconButton
            icon={"comment"}
            color={"black"}
            style={styles.button}
            onPress={() => {
              nav.navigation.setOptions({ fetchComments: fetchComments });
              nav.navigation.navigate("Comments", {
                postId: postId,
              });
            }}
          />
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
