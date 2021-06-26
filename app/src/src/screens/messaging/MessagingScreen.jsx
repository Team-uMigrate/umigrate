import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/views/Header';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Renders the messaging screen.
 * @param {StackNavigationProp} navigation
 * @return {JSX.Element}
 * */
const MessagingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Messaging" isMessagingOrCommentsPage={true} />
      <Text style={styles.title}>Messaging Page!</Text>
    </View>
  );
};

export default MessagingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  title: {
    alignSelf: 'center',
    marginTop: '80%',
  },
});
