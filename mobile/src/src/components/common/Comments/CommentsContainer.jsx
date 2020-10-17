import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CommentsContainer = ({ shouldRender }) => {
  if (shouldRender) {
    return (
      <View>
        <Text>This is a comment</Text>
      </View>
    );
  } else {
    return <></>;
  }
};

export default CommentsContainer;

styles = StyleSheet.create({});
