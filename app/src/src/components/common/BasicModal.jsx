import React from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import OptionModal from '../modals/OptionModal';
import PickADayModal from '../modals/PickADayModal';

// Basic outline for a sliding-up modal
const BasicModal = ({
  version,
  visible,
  setVisible,
  title,
  type,
  setType,
  choices,
  setZero,
  setDate,
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
        {version == 'options' ? (
          <OptionModal
            visible={visible}
            setVisible={setVisible}
            title={title}
            type={type}
            setType={setType}
            choices={choices}
            setZero={setZero}
            styles={styles}
          />
        ) : version == 'date' ? (
          <PickADayModal
            visible={visible}
            setVisible={setVisible}
            title={title}
            type={type}
            setType={setType}
            setDate={setDate}
            styles={styles}
          />
        ) : (
          ''
        )}
      </Modal>
    </View>
  );
};
export default BasicModal;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '90%',
    marginBottom: '2%',
  },
  modalView: {
    height: '90%',
    width: '90%',
    top: '15%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  modalPicker: {
    height: '50%',
    width: '100%',
  },
  modalOptions: {
    marginBottom: 15,
    textAlign: 'center',
  },
  openButton: {
    backgroundColor: '#007CFF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
