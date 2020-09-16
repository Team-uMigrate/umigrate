import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../common/Header";

const MarketPage = () => {
  return (
    <View style={styles.container}>
      <Header title="Market" />
      <Text style={styles.title}>Market Page!</Text>
    </View>
  );
};

export default MarketPage;

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
