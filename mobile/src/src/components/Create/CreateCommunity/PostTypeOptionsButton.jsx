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
      color={selectedPostType === title ? "#8781D0" : "white"}
      dark={selectedPostType === title ? true : false}
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
    borderRadius: 15,
    marginHorizontal: 3,
  },
});
