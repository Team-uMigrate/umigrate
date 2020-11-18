import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const PostTypeOptionsButton = ({
  title,
  selectedPostType,
  setSelectedPostType,
}) => {
  return (
    <Button
      mode={"contained"}
      style={styles.postTypeOptionsButton}
      color={selectedPostType === title ? "#6367B4" : "white"}
      onPress={() => {
        setSelectedPostType(title);
      }}
    >
      {title}
    </Button>
  );
};

export default PostTypeOptionsButton;

const styles = StyleSheet.create({
  postTypeOptionsButton: {
    flex: 1,
    elevation: 10,
    borderRadius: 10,
    marginHorizontal: 3,
  },
});
