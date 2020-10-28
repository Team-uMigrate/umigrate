import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";

const CommentView = ({ id, content }) => {
  return (
    <View style={styles.commentView}>
      <Text>Shashank!!!</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginRight: "2.5%" }}>
          <Avatar.Icon size={30} icon={"account"} />
        </View>
        <View style={styles.contentContainer}>
          <Text>{"Comment " + id}</Text>
        </View>
        <View style={styles.timestampView}>
          <Text style={styles.timestamp}>2:12 pm</Text>
        </View>
      </View>
    </View>
  );
};

export default CommentView;

const styles = StyleSheet.create({
  commentView: {
    margin: 5,
    marginLeft: 10,
  },
  contentContainer: {
    borderRadius: 100,
    backgroundColor: "#EBEBEB",
    padding: 5,
  },
  timestampView: {
    marginLeft: 2,
    alignSelf: "flex-end",
  },
  timestamp: {
    color: "gray",
    fontSize: 10,
    paddingBottom: 5,
  },
});
