import React, { useContext } from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Image } from "react-native";
import Logo from "../../../../assets/favicon.png";
import NavContext from "../../../contexts/NavContext";
import { getStatusBarHeight } from "react-native-status-bar-height";

const statusHeight = getStatusBarHeight(true);

const Header = ({ title, isMessagingPage = false }) => {
  const nav = useContext(NavContext);

  return (
    <Appbar.Header style={styles.header} statusBarHeight={statusHeight}>
      {isMessagingPage && (
        <Appbar.BackAction
          color="#555555"
          onPress={() => nav.navigation.goBack()}
        />
      )}
      <Image style={styles.image} source={Logo} />
      <Appbar.Content color="#555555" title={title} />
      <Appbar.Action color="#555555" icon="magnify" />
      {!isMessagingPage && (
        <Appbar.Action
          color="#555555"
          icon="message"
          onPress={() => nav.navigation.navigate("Messaging")}
        />
      )}
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ffffff",
  },
  image: {
    height: 40,
    width: 40,
    marginLeft: 5,
  },
});
