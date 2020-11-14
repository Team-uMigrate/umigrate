import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../common/Header";
import FeedContainer from "./Feed/FeedContainer.jsx";
import CreateModal from "../Create/CreateModal";

const CommunityPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Community Page" />
      <FeedContainer />
      <CreateModal navigation={navigation} />
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
