import React from 'react';
import { Platform } from 'react-native';
import { Button, Portal, Modal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

// Modal to select a day and time
const PickADayTimeModal = ({
  showDatePicker,
  onShowDatePickerChange,
  showTimePicker,
  onShowTimePickerChange,
  eventTime,
  onEventTimeChange,
}) => {
  return (
    <Portal>
      <Modal
        visible={showDatePicker || showTimePicker}
        contentContainerStyle={{ backgroundColor: 'white' }}
        onDismiss={() => {
          onShowDatePickerChange(false);
          onShowTimePickerChange(false);
        }}
      >
        {/* Date picker */}
        {showDatePicker && (
          <DateTimePicker
            value={eventTime}
            onChange={(_event, selectedDate) => {
              const currentDate = selectedDate || eventTime;

              if (Platform.OS !== 'ios') {
                onShowDatePickerChange(false);
                onShowTimePickerChange(true);
              }
              onEventTimeChange(currentDate);
            }}
            mode={'date'}
            display={'default'}
            minimumDate={new Date()}
          />
        )}

        {/* Time picker */}
        {showTimePicker && (
          <DateTimePicker
            value={eventTime}
            onChange={(_event, selectedDate) => {
              const newTime = selectedDate || eventTime;
              const hours = newTime.getHours();
              const minutes = newTime.getMinutes();

              // Clone the date object
              let currentDate = new Date(eventTime.getTime());
              currentDate.setHours(hours);
              currentDate.setMinutes(minutes);
              currentDate.setSeconds(0);

              onShowTimePickerChange(Platform.OS === 'ios');
              onEventTimeChange(currentDate);
            }}
            mode={'time'}
            display={'default'}
          />
        )}

        {/* The DateTimePicker on iOS doesn't include a confirm button, while Android does :( */}
        {Platform.OS === 'ios' && (
          <Button
            onPress={() => {
              if (showDatePicker) {
                onShowDatePickerChange(false);
                onShowTimePickerChange(true);
              } else if (showTimePicker) onShowTimePickerChange(false);
            }}
          >
            {showDatePicker ? 'Select time' : 'Confirm'}
          </Button>
        )}
      </Modal>
    </Portal>
  );
};
export default PickADayTimeModal;
