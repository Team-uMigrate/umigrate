import React, { useState, useContext } from "react";
import { Text, Alert, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import ModalContext from "../../contexts/ModalContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GradientButton from "react-native-gradient-buttons";

const CreateModal = () => {
  const modal = useContext(ModalContext);
  return (
    <View>
      <Modal
        onBackdropPress={() => modal.setModalVisible(false)}
        // animationType="slide"
        visible={modal.isVisible}
        transparent={true}
        style={styles.modalContent}
        // backdropOpacity={0.3}
        backdropOpacity={modal.isVisible ? 0.2 : 1}
      >
        <View style={styles.modalView}>
          <Text style={styles.text}>Where would you like to post...</Text>
          <View style={styles.buttonContainer}>
            <GradientButton
              style={styles.buttonStyle}
              gradientBegin="#FF3465"
              gradientEnd="#292462"
              gradientDirection="diagonal"
              onPressAction={() => Alert.alert("Simple Button pressed")}
              icon={<MaterialCommunityIcons name="public" size={50} />}
            >
              <MaterialCommunityIcons name="earth" size={30} />
              <Text style={styles.buttonText}> </Text>
              <Text style={styles.buttonText}>Community</Text>
            </GradientButton>
            <GradientButton
              style={styles.buttonStyle}
              textStyle={{ fontSize: 16 }}
              gradientBegin="#FF3465"
              gradientEnd="#292462"
              gradientDirection="diagonal"
              onPressAction={() => Alert.alert("Simple Button pressed")}
            >
              Market
            </GradientButton>
            <GradientButton
              style={styles.buttonStyle}
              textStyle={{ fontSize: 16 }}
              gradientBegin="#FF3465"
              gradientEnd="#292462"
              gradientDirection="diagonal"
              onPressAction={() => Alert.alert("Simple Button pressed")}
            >
              Housing
            </GradientButton>
          </View>
        </View>
      </Modal>
    </View>
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
    margin: 0,
  },
  buttonStyle: {
    flex: 1,
    height: 100,
    width: 100,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    width: 340,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderColor: "#CDCBEC",
    paddingHorizontal: 10,
    paddingVertical: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 50,
  },
});
