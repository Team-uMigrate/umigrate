import React from 'react';
import { Platform } from 'react-native';
import { Button, Portal, Modal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

// Modal to select a day and time
class PickADayTimeModal extends React.Component {
  render() {
    return (
      <Portal>
        <Modal
          visible={this.props.showDatePicker || this.props.showTimePicker}
          contentContainerStyle={{ backgroundColor: 'white' }}
          onDismiss={() => {
            this.props.onShowDatePickerChange(false);
            this.props.onShowTimePickerChange(false);
          }}
        >
          {/* Date picker */}
          {this.props.showDatePicker && (
            <DateTimePicker
              value={this.props.eventTime}
              onChange={(_event, selectedDate) => {
                const currentDate = selectedDate || this.props.eventTime;

                if (Platform.OS !== 'ios') {
                  this.props.onShowDatePickerChange(false);
                  this.props.onShowTimePickerChange(true);
                }
                this.props.onEventTimeChange(currentDate);
              }}
              mode={'date'}
              display={'default'}
              minimumDate={new Date()}
            />
          )}

          {/* Time picker */}
          {this.props.showTimePicker && (
            <DateTimePicker
              value={this.props.eventTime}
              onChange={(_event, selectedDate) => {
                const newTime = selectedDate || this.props.eventTime;
                const hours = newTime.getHours();
                const minutes = newTime.getMinutes();

                // Clone the date object
                let currentDate = new Date(this.props.eventTime.getTime());
                currentDate.setHours(hours);
                currentDate.setMinutes(minutes);
                currentDate.setSeconds(0);

                this.props.onShowTimePickerChange(Platform.OS === 'ios');
                this.props.onEventTimeChange(currentDate);
              }}
              mode={'time'}
              display={'default'}
            />
          )}

          {/* The DateTimePicker on iOS doesn't include a confirm button, while Android does :( */}
          {Platform.OS === 'ios' && (
            <Button
              onPress={() => {
                if (this.props.showDatePicker) {
                  this.props.onShowDatePickerChange(false);
                  this.props.onShowTimePickerChange(true);
                } else if (this.props.showTimePicker)
                  this.props.onShowTimePickerChange(false);
              }}
            >
              {this.props.showDatePicker ? 'Select time' : 'Confirm'}
            </Button>
          )}
        </Modal>
      </Portal>
    );
  }
}
export default PickADayTimeModal;
