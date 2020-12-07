import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

// Customized text input component for the create pages
// Made to reduce copy-pasted code in the create pages by a bit
const CreatePageTextInput = ({
  textValue,
  setText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  style,
}) => {
  return (
    <TextInput
      autoCapitalize={'sentences'}
      autoCorrect={true}
      // Add to the default styles defined below
      style={{ ...styles.basicTextInput, ...style }}
      value={textValue}
      placeholder={placeholder}
      placeholderTextColor={'#484848'}
      backgroundColor={'#DCDCDC'}
      onChangeText={setText}
      multiline={multiline}
      numberOfLines={numberOfLines}
    />
  );
};

export default CreatePageTextInput;

const styles = StyleSheet.create({
  basicTextInput: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    padding: 3,
    paddingLeft: '5%',
  },
});
