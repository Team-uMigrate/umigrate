import React, { useState, useContext } from 'react';
import { Text, Alert, StyleSheet, View, Image } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import Modal from 'react-native-modal';
import CreateItemContext from '../../contexts/CreateItemContext';
import { routes } from '../../utils/routes';

const UserViewModal = ({ navigation }) => {
  // const createItem = useContext(CreateItemContext);

  // const navigate = (page) => {
  //   createItem.setIsModalVisible(false);
  //   navigation.navigate(routes.createItem, { page: page });
  // };

  return (
    <View>
      <Modal
        //onBackdropPress={() => createItem.setIsModalVisible(false)}
        //visible={createItem.isModalVisible}
        visible={true}
        transparent={true}
        style={styles.modalContent}
        // backdropOpacity={0.3}
      //  backdropOpacity={createItem.isModalVisible ? 0.2 : 1}
      >
        <View style={styles.modalView}>
          <View style={styles.backHeading}>
            <Image
              style={styles.backGroundHeading}
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png" }}
            />
            <View style={styles.profileArea}>
              <Avatar.Image
                size={110}
                style={styles.pfpShadow}
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/220px-SNice.svg.png" }}
              />
              <Text style={styles.profileName}>{"John Doe"}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.buttonStyle}
             // onPress={() => navigate(routes.messaging)}
            >
              <Text style={styles.buttonText}>Message</Text>
            </Button>
            <Button
              style={styles.buttonStyle}
             // onPress={() => navigate(routes.profile)}
            >
              <Text style={styles.buttonText}>View Profile</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserViewModal;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    paddingBottom: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  modalContent: {
    margin: 0,
  },
  buttonStyle: {
    flex: 1,
    height: 100,
    width: 100,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalView: {
    margin: 50,
    width: 340,
    height: 400,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderColor: '#CDCBEC',
    paddingHorizontal: 10,
    paddingVertical: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  backHeading: {
    width: '100%',
    height: '20%',
  },
  backGroundHeading: {
    flex: 2,
    width: '100%',
    height: '20%',
  },
  profileArea: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    // get half of pfp on background and half not
    bottom: '-75%',
    paddingBottom: '-60%',
    width: '100%',
  },
  profileImg: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pfpShadow: {
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 5,
    textAlign: 'center',
  },
  profileText: {
    fontSize: 14,
    textAlign: 'center',
  },
  rows1: {
    flex: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '35%',
  },
  rows2: {
    flex: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  tiles: {
    backgroundColor: '#ffffff',
    margin: '2%',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  textLogout: {
    textAlign: 'center',
    color: '#ff0000',
  },
  iconPic: {
    alignSelf: 'center',
    marginBottom: '-15%',
  }
});
