import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from "../common/Header";

const CommunityPage = () => {
  return (
    <View style={styles.container}>
      <Header title="Community"/>
      <Text style={styles.title}>Community Page!</Text>
    </View>
  );
};

export default CommunityPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  title: {
    alignSelf: "center",
    marginTop: "80%"
  }
});
