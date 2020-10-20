import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  TouchableHighlight,
} from "react-native";
import Header from "../components/common/Header";
import { Button, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

CreateModalComponent = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <>
      <Header title="Create" />
      <View style={styles.modalContent}>
        <Modal
          animationType="slide"
          visible={modalVisible}
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

            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.text}>Hide</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default CreateModalComponent;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  modalContent: {
    height: 300,
    margin: 50,
  },
  buttonStyle: {
    height: 100,
    width: 100,
    backgroundColor: "#F1E6FF",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    flexDirection: "column",
    backgroundColor: "#E7FCFF",
    borderRadius: 20,
    padding: 15,
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
