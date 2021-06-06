import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Common selection inside modals
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
    setType(itemValue);
    setZero(itemValue === 0 ? 0 : 999);
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
            {choices.map((choice, i) => (
              <Picker.Item
                key={i}
                label={choice}
                value={i}
                style={styles.modalOptions}
              />
            ))}
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
