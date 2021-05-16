import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// common selection inside modals
const OptionModal = ({
  visible,
  setVisible,
  title,
  type,
  setType,
  choices,
  setZero,
  styles,
}) => {
  const onPickerChange = (itemValue, _itemIndex) => {
    let zero = 999;
    if (itemValue == 0) zero = 0;
    setType(itemValue);
    setZero(zero);
  };

  const getOptions = () => {
    let temp = [];
    if (choices.length) {
      for (let i = 0; i < choices.length; i++) {
        temp.push(
          <Picker.Item
            key={i}
            label={choices[i]}
            value={i}
            style={styles.modalOptions}
          />
        );
      }
    }
    return temp;
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{title}</Text>
        <View style={styles.modalButton}>
          <Picker
            selectedValue={type}
            style={styles.modalPicker}
            onValueChange={(itemValue, itemIndex) =>
              onPickerChange(itemValue, itemIndex)
            }
          >
            {getOptions()}
          </Picker>
        </View>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setVisible(!visible);
          }}
        >
          <Text style={styles.textStyle}>Close</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default OptionModal;
