import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { RadioButton, List } from 'react-native-paper';

// a button with a dropdown selector
const DropdownList = ({ choices, text, set, currChoice, currVal, setZero }) => {
  const [expand, setExpand] = useState(false);
  const [value, setValue] = useState(currVal);
  const press = () => setExpand(!expand);
  const chooseMsg = 'Choose ' + text;
  return (
    <View style={styles.viewStyle}>
      <List.Accordion
        style={expand ? styles.accordionOnExpand : styles.accordion}
        title={expand ? chooseMsg : value ? choices[value] : currChoice}
        expanded={expand}
        onPress={press}
        titleStyle={{ ...styles.title, color: expand ? '#1A5BBB' : '#000' }}
      >
        <View style={styles.radioGroup}>
          <RadioButton.Group
            style={styles.radioBtn}
            onValueChange={(value) => {
              setZero(value === 0 ? 0 : 999);
              setValue(value);
              set(value);
            }}
            value={value}
          >
            <ScrollView style={styles.scrollView} nestedScrollEnabled={true}>
              {choices.map((choice, i) => (
                <View
                  style={i === choices.length - 1 ? {} : styles.radioBtn}
                  key={i}
                >
                  <RadioButton.Item
                    key={i}
                    label={choice}
                    value={i}
                    labelStyle={styles.title}
                    status={value === i ? 'checked' : 'unchecked'}
                    color={'#483FAB'}
                  />
                </View>
              ))}
            </ScrollView>
          </RadioButton.Group>
        </View>
      </List.Accordion>
    </View>
  );
};

export default DropdownList;

const styles = StyleSheet.create({
  viewStyle: {
    position: 'absolute',
    width: '100%',
  },
  title: {
    fontSize: Platform.OS === 'ios' ? 14 : 10,
    textAlign: 'left',
  },
  scrollView: {
    height: '50%',
    width: '100%',
    alignSelf: 'center',
  },
  accordion: {
    padding: 0,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
  },
  accordionOnExpand: {
    padding: 0,
    elevation: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
  },
  radioGroup: {
    elevation: 5,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  radioBtn: {
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
});
