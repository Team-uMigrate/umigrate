import React from 'react';
import { Text, View, TouchableHighlight, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import YYYYMMDD from '../common/FormatDate/YYYYMMDD';
// modal to select a day
const PickADayModal = ({
  visible,
  setVisible,
  title,
  setType,
  type,
  setDate,
  styles,
}) => {
  const onDateChange = (_event, selectedValue) => {
    setDate(selectedValue);
    const yyyymmdd = YYYYMMDD({ selectedValue: selectedValue });
    setType(yyyymmdd);
  };
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{title}</Text>
        <View style={styles.modalButton}>
          <DateTimePicker
            style={
              Platform.OS == 'ios' && Platform.Version >= 14
                ? {
                    width: '100%',
                    flex: 1,
                    left: '35%',
                  }
                : { width: '100%', flex: 1 }
            }
            value={type}
            display="default"
            mode="date"
            minimumDate={new Date(1960, 0, 1)}
            maximumDate={new Date()}
            onChange={(event, selectedValue) =>
              onDateChange(event, selectedValue)
            }
          />
        </View>
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => setVisible(!visible)}
        >
          <Text style={styles.textStyle}>Close</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default PickADayModal;
