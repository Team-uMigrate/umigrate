import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../common/Header";

const CreatePage = () => {
  return (
    <View style={styles.container}>
      <Header title="Create" />
    </View>
  );
};

export default CreatePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
});
