import React, { useContext, useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import Header from "../common/Header";
import { TextInput, Text, Button } from "react-native-paper";
import CreateModal from "./";

const CreatePage = () => {
  const [modalVisible, setModalVisible] = useState(true);
  // setModalVisible(true);
  return (
    <View style={styles.container}>
      <Header title="Create" />
      <Modal visible={modalVisible} style={styles.modal} transparent={true}>
        <View style={styles.modalView}>
          <Text>Where would you like to post...</Text>
          <Button
            compact={true}
            style={styles.buttonStyle}
            mode="contained"
            title="Community"
            onPress={() => Alert.alert("Simple Button pressed")}
          >
            Community
          </Button>
          <Button
            compact={true}
            style={styles.buttonStyle}
            mode="contained"
            title="Community"
            onPress={() => Alert.alert("Simple Button pressed")}
          >
            Community
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default CreatePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  buttonStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modal: {
    width: 300,
    height: 300,
    margin: 0,
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
