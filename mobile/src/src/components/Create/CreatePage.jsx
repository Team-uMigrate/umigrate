import React, { useContext, useState } from "react";
import { Text, Alert, Modal, StyleSheet, View } from "react-native";
import Header from "../common/Header";

const CreatePage = ({ route }) => {
  const { page } = route.params;
  console.dir(page);
  return (
    <View style={styles.container}>
      <Header title="Create" />
      <Text>Create page! {page}</Text>
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
