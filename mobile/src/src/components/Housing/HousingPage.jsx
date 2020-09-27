import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../common/Header";
import { ListingsEndpoint } from "../../utils/endpoints";
import ListingContainer  from "./Listings/ListingsContainer";

const HousingPage = () => {
  
  return (
    <View style={styles.container}>
      <Header title="Housing" />
      <ListingContainer/>
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
