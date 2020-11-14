import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../common/Header";

const NotificationPage = () => {
  return (
    <View style={styles.container}>
      <Header title="Notifications" isNotificationPage={true} />
      <Text style={styles.title}>Notification Page!</Text>
    </View>
  );
};

export default NotificationPage;

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
