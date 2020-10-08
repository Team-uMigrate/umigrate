import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../common/Header";
import FeedContainer from "./Feed/FeedContainer.jsx";

const CommunityPage = () => {
  return (
    <View style={styles.container}>
      <Header title="Community Page" />
      <FeedContainer />
    </View>
  );
};

export default CommunityPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
});
