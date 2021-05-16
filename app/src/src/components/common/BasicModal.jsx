import React from 'react';
import { Modal, View } from 'react-native';
import OptionModal from '../modals/OptionModal';

// basic outline for a sliding-up modal
const BasicModal = ({
  visible,
  setVisible,
  title,
  type,
  setType,
  choices,
  setZero,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        hardwareAccelerated={true}
        onRequestClose={() => setVisible(false)}
      >
        <OptionModal
          visible={visible}
          setVisible={setVisible}
          title={title}
          type={type}
          setType={setType}
          choices={choices}
          setZero={setZero}
        />
      </Modal>
    </View>
  );
};
export default BasicModal;
