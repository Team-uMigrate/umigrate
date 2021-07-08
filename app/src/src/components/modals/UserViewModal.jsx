import React, { useState, useContext } from 'react';
import { Text, Alert, StyleSheet, View, Image } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import Modal from 'react-native-modal';
import UserViewContext from '../../contexts/UserViewContext';
import { routes } from '../../utils/routes';

const UserViewModal = ({ navigation }) => {
  const userView = useContext(UserViewContext);
  const navigate = (route) => {
    if (userView.user !== null) userView.setUser(null);
    navigation.navigate(route);
  };

  return (
    <View>
      <Modal
        onBackdropPress={() => userView.setUser(null)}
        visible={userView.user !== null}
        transparent={true}
        style={styles.modalContent}
        backdropOpacity={userView.user ? 0.2 : 1}
      >
        <View style={styles.modalView}>
          <View style={styles.backHeading}>
            {userView.user?.background_photo && (
              <Image
                style={styles.backGroundHeading}
                source={{ uri: userView.user.background_photo }}
              />
            )}
            <View style={styles.profileArea}>
              {userView.user?.profile_photo ? (
                <Avatar.Image
                  size={110}
                  style={styles.pfpShadow}
                  source={{ uri: userView.user.profile_photo }}
                />
              ) : (
                <Avatar.Icon size={110} icon={'account'} />
              )}
              <Text style={styles.profileName}>
                {userView.user?.preferred_name}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              style={styles.buttonStyle}
              onPress={() => navigate(routes.messaging)}
            >
              <Text style={styles.buttonText}> Message</Text>
            </Button>
            <Button
              mode="contained"
              style={styles.buttonStyle}
              onPress={() => navigate(routes.profile)}
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
    marginHorizontal: 'auto',
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: '#8781D0',
    height: 35,
    width: 100,
    borderRadius: 15,
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    top: 125,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 50,
    width: 340,
    height: 320,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderColor: '#CDCBEC',
    paddingHorizontal: 10,
    paddingVertical: 30,
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  backHeading: {
    width: '100%',
    height: '40%',
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
  pfpShadow: {
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
    alignSelf: 'center',
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 5,
    textAlign: 'center',
  },
});
