import React, { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
// import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

const LikedUserView = (props) => {
  const { first_name, profile_photo } = props;
  return (
    <>
      <View style={styles.ListBegin}>
        <Text style={styles.text}>{first_name}</Text>
        <Image style={styles.image} source={profile_photo}></Image>
      </View>
    </>
  );
};

export default LikedUserView;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    marginTop: 44,
  },
});
