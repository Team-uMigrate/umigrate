import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../common/Header";
import { Button } from "react-native-paper";

const SavedPostsPage = ({ navigation }) => {
  const menuRedirect = () => {
    navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <Header title="Saved Posts" />
      <Text style={styles.title}>Saved Posts Page!</Text>
      <Button onPress={menuRedirect}>Back to Menu</Button>
    </View>
  );
};

export default SavedPostsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  title: {
    alignSelf: "center",
    marginTop: "80%",
  },
});
