import React, { useState, useContext } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  TouchableHighlight,
} from "react-native";
import { Button, Text } from "react-native-paper";
import ModalContext, {
  ModalContextProvider,
} from "../../contexts/CreateModalContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CreateModal = () => {
  const modal = useContext(ModalContext);
  console.log(modal);
  return (
    <Modal
      // onBackdropPress={() => modal.setModalVisible(false)} //Should hide modal when pressed on background but doesnt work
      animationType="slide"
      visible={modal.isVisible}
      transparent={true}
      style={styles.modalContent}
    >
      <View style={styles.modalView}>
        <Text style={styles.text}>Where would you like to post...</Text>
        <View style={styles.buttonContainer}>
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
            Market
          </Button>
          <Button
            compact={true}
            style={styles.buttonStyle}
            mode="contained"
            title="Community"
            onPress={() => Alert.alert("Simple Button pressed")}
          >
            Housing
          </Button>
        </View>

        <TouchableHighlight onPress={() => modal.setModalVisible(false)}>
          <Text style={styles.text}>Hide</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

export default CreateModal;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    paddingBottom: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  modalContent: {
    height: 2,
    margin: 0,
  },
  buttonStyle: {
    flex: 1,
    height: 100,
    width: 100,
    backgroundColor: "#F1E6FF",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: 340,
    flexDirection: "column",
    backgroundColor: "#E7FCFF",
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    bottom: 50,
  },
});
