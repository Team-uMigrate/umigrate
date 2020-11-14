import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../common/Header";
import ListingContainer from "./Listings/ListingsContainer";
import CreateModal from "../Create/CreateModal";

const HousingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Housing" />
      <ListingContainer />
      <CreateModal navigation={navigation} />
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
