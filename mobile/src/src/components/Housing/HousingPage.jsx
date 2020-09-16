import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../common/Header";

const HousingPage = () => {
  return (
    <View style={styles.container}>
      <Header title="Housing" />
      <Text style={styles.title}>Housing Page!</Text>
    </View>
  );
};

export default HousingPage;

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
