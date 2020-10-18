import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../common/Header";
import ListingContainer from "./Listings/ListingsContainer";

const HousingPage = () => {
  return (
    <View style={styles.container}>
      <Header title="Housing" />
      <ListingContainer />
    </View>
  );
};

export default HousingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
});
