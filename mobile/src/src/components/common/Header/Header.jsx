import React from 'react';
import { Appbar } from "react-native-paper";
import { StyleSheet, Image } from "react-native";
import Logo from "../../../../assets/favicon.png";

const Header = ({title}) => {
  return (
    <Appbar.Header style={styles.header} statusBarHeight={0}>
      <Image style={styles.image} source={Logo} />
      <Appbar.Content color="#555555" title={title} />
      <Appbar.Action color="#555555" icon="magnify" />
      <Appbar.Action color="#555555"  icon="message" />
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffffff"
  },
  image: {
    height: 40,
    width: 40,
    marginLeft: 5
  }
});
