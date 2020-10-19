import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import Header from "../common/Header";
import { TextInput, Text, Button } from "react-native-paper";
import CreateModal from "./";

const CreatePage = () => {
  return (
    <View style={styles.container}>
      <Header title="Create" />
      <Modal>
        <View style={styles.modalView}>
          <Text>Where would you like to post...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default CreatePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#eeeeee",
  },
});
