import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../common/Header";
import AdsContainer from "./Ads/AdsContainer";

const MarketPage = () => {
  return (
    <View style={styles.container}>
      <Header title="Market" />
      <AdsContainer />
    </View>
  );
};

export default MarketPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
});
