import React, { useContext, useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import Header from "../common/Header";

const CreatePage = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.container}>
      <Header title="Create" />
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
