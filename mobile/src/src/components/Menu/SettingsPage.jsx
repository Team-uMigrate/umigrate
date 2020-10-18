import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../common/Header";
import { Button } from "react-native-paper";

const SettingsPage = ({ navigation }) => {
  const menuRedirect = () => {
    navigation.navigate("Menu");
  };

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <Text style={styles.title}>Settings Page!</Text>
      <Button onPress={menuRedirect}>Back to Menu</Button>
    </View>
  );
};

export default SettingsPage;

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
