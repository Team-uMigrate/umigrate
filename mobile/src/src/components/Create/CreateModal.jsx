import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";

const CreateModal = () => {
  return (
    <View>
      <Modal>
        <View>
          <Text>Where would you like to post...</Text>
        </View>
      </Modal>
    </View>
  );
};

export default CreateModal;

const styles = StyleSheet.create({
  container: {
    marginTop: "2.5%",
    padding: 5,
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  modalView: {
    margin: 20,
    backgroundColor: "red",
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
  },
});
