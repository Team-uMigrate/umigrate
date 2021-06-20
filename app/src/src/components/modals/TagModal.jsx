import React from 'react';
import { Modal } from 'react-native-paper';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const TagModal = ({ visible, setVisible }) => {
  return (
    <Modal
      visible={visible}
      onDismiss={() => {
        setVisible(false);
      }}
      contentContainerStyle={styles.communitySelectModal}
    >
      {/* Used to exit the search bar of the modal without exiting the modal itself */}
      {/* For some reason, you can't just tap anywhere on the modal to dismiss the keyboard by default */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={{ paddingBottom: '15%' }}>
          <Text style={styles.promptText}>Tag friend(s)</Text>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TagModal;

const styles = StyleSheet.create({
  communitySelectModal: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: '10%',
  },
  promptText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 5,
  },
});
