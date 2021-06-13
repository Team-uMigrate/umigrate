import React from 'react';
import { Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';

// A button styled to look like the button with
// the down arrow shown in the figma.
const ButtonWithDownArrow = ({ onPress, text, textColour }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={{ flex: 1 }}>
      <Card style={styles.cardStyle}>
        <View style={styles.viewStyle}>
          {/* Todo montserrat here */}
          <Text style={{ ...styles.textStyle, color: textColour }}>{text}</Text>
          <Entypo
            name="triangle-down"
            style={{ alignSelf: 'center' }}
            size={16}
            color="black"
          />
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

export default ButtonWithDownArrow;

const styles = StyleSheet.create({
  cardStyle: {
    padding: 5,
    paddingLeft: 10,
    elevation: 5,
    borderRadius: 10,
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: { fontSize: 14 },
});
