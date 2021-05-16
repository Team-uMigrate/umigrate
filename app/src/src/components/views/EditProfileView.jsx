import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TouchableHighlight,
  Platform,
  ScrollView,
} from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ProfileEndpoint } from '../../utils/endpoints';
import Header from './Header';
import ProfileView from './ProfileView';
import * as ImagePicker from 'expo-image-picker';
import { routes } from '../../utils/routes';
import { setUserData } from '../../utils/storageAccess';
import { communities, programs, pronouns, terms } from '../../utils/choices';
import PickImage from '../common/PickImage';
import BasicModal from '../common/BasicModal';

const EditProfileView = ({ user, navigation }) => {
  // useStates for data
  const [bgPic, setbgPic] = useState();
  const [pfp, setPfp] = useState();
  //const [pfpFile, setPfpFile] = useState();
  //const [bgPicFile, setbgPicFile] = useState();
  const [prefName, setPrefName] = useState(user.preferred_name);
  const [phone, setPhone] = useState(user.phone_number);
  const [pronoun, setPronoun] = useState(user.pronouns);
  const [birth, setBirth] = useState(user.birthday);
  const [reg, setRegion] = useState(user.community);
  const [program, setProgram] = useState(user.enrolled_program);
  const [term, setTerm] = useState(user.current_term);

  // useStates for modal
  const [visiblePronoun, setVisiblePronoun] = useState(false);
  const [visibleReg, setVisibleReg] = useState(false);
  const [visiblePro, setVisiblePro] = useState(false);
  const [visibleTerm, setVisibleTerm] = useState(false);
  const [visibleBirth, setVisibleBirth] = useState(false);
  const [visiblePics, setVisiblePics] = useState(false);

  // useState for datetimepicker
  const [date, setDate] = useState(new Date());

  // useStates for stupid react native picker defaulting 0
  const [zeroPronoun, setZeroPronoun] = useState();
  const [zeroReg, setZeroReg] = useState();
  const [zeroPro, setZeroPro] = useState();
  const [zeroTerm, setZeroTerm] = useState();

  const handleEdit = async () => {
    const result = await ProfileEndpoint.patch({
      //profile_photo: pfp ? pfpFile : user.profile_photo,
      //background_photo: bgPic ? bgPicFile : user.background_photo,
      preferred_name: prefName ? prefName : user.preferred_name,
      phone_number: phone ? phone : user.phone_number,
      pronouns: zeroPronoun == 0 ? 0 : pronoun ? pronoun : user.pronouns,
      birthday: birth ? birth : user.birthday,
      community: zeroReg == 0 ? 0 : reg ? reg : user.community,
      enrolled_program:
        zeroPro == 0 ? 0 : program ? program : user.enrolled_program,
      current_term: zeroTerm == 0 ? 0 : term ? term : user.current_term,
    });
    if (result) {
      await setUserData(result.data);
      navigation.navigate(routes.profile);
    }
  };

  useEffect(() => {
    const askUser = async () => {
      if (Platform.OS !== 'web') {
        const status = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('We need your camera roll permissions to change your pictures');
        }
      }
    };
    askUser();
  }, []);

  // in new UI, there's no modal for editing the pictures, so this will become useless anyways (except the PickImage call)
  const getPicsModal = () => {
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalPicView}>
          <Text style={styles.modalText}>Choose a picture to change!</Text>
          <View style={styles.modalButton}>
            <TouchableHighlight
              style={styles.picsButton}
              onPress={async () => {
                await PickImage({ set: setPfp });
              }}
            >
              <Text style={styles.textStyle}>Profile</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.picsButton}
              onPress={async () => {
                await PickImage({ set: setbgPic });
              }}
            >
              <Text style={styles.textStyle}>Background</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            style={styles.openButton}
            onPress={() => setVisiblePics(!visiblePics)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BasicModal
        version={'options'}
        visible={visiblePronoun}
        setVisible={setVisiblePronoun}
        title={'Pick a pronoun option!'}
        type={pronoun}
        setType={setPronoun}
        choices={pronouns}
        setZero={setZeroPronoun}
      />
      <BasicModal
        version={'options'}
        visible={visibleReg}
        setVisible={setVisibleReg}
        title={'Pick a community option!'}
        type={reg}
        setType={setRegion}
        choices={communities}
        setZero={setZeroReg}
      />
      <BasicModal
        version={'options'}
        visible={visiblePro}
        setVisible={setVisiblePro}
        title={'Pick a program option!'}
        type={program}
        setType={setProgram}
        choices={programs}
        setZero={setZeroPro}
      />
      <BasicModal
        version={'options'}
        visible={visibleTerm}
        setVisible={setVisibleTerm}
        title={'Pick a current term option!'}
        type={term}
        setType={setTerm}
        choices={terms}
        setZero={setZeroTerm}
      />
      <BasicModal
        version={'date'}
        visible={visibleBirth}
        setVisible={setVisibleBirth}
        title={'Pick your birthday!'}
        type={date}
        setType={setBirth}
        setDate={setDate}
      />
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visiblePics}
          hardwareAccelerated={true}
          onRequestClose={() => setVisiblePics(false)}
        >
          {getPicsModal()}
        </Modal>
      </View>
      <Header title="Edit Profile" />
      <View style={styles.backHeading}>
        <Image
          style={styles.backGroundHeading}
          source={{ uri: bgPic ? bgPic : user.background_photo }}
        />
        <View style={styles.profileArea}>
          <TouchableOpacity
            style={styles.profileImg}
            onPress={() => navigation.navigate(routes.menuHome)}
          >
            <Avatar.Image
              size={100}
              style={styles.pfpShadow}
              source={{ uri: pfp ? pfp : user.profile_photo }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1, marginHorizontal: 1 }}
        scrollEnabled={Platform.OS == 'android'}
      >
        <View style={styles.pfInfo}>
          <Button
            style={styles.changePicButton}
            onPress={() => setVisiblePics(!visiblePics)}
          >
            <Text style={styles.changePicButtonText}>Edit pictures</Text>
          </Button>
          <View>
            <Text style={styles.textLabel}>Preferred name</Text>
            <TextInput
              style={styles.textVal}
              underlineColor="#B8B7B7"
              defaultValue={user.preferred_name}
              onChangeText={(text) => setPrefName(text)}
            ></TextInput>
          </View>
          <View style={styles.rows}>
            <ProfileView label="First name" val={user.first_name} />
            <ProfileView label="Last name" val={user.last_name} row={true} />
          </View>
          <View>
            <ProfileView label="Email" val={user.email} />
            <Text style={styles.textLabel}>Phone</Text>
            <TextInput
              style={styles.textVal}
              underlineColor="#B8B7B7"
              defaultValue={user.phone_number}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <View style={styles.rows}>
            <TouchableOpacity
              onPress={() => setVisiblePronoun(!visiblePronoun)}
            >
              <ProfileView
                label="Pronoun"
                val={
                  zeroPronoun == 0
                    ? pronouns[0]
                    : pronoun
                    ? pronouns[pronoun]
                    : pronouns[user.pronouns]
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleBirth(!visibleBirth)}>
              <ProfileView
                label="Birthday"
                val={birth ? birth : user.birthday}
                row={true}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => setVisibleReg(!visibleReg)}>
              <ProfileView
                label="Community"
                val={
                  zeroReg == 0
                    ? communities[0]
                    : reg
                    ? communities[reg]
                    : communities[user.community]
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisiblePro(!visiblePro)}>
              <ProfileView
                label="Program"
                val={
                  zeroPro == 0
                    ? programs[0]
                    : program
                    ? programs[program]
                    : programs[user.enrolled_program]
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleTerm(!visibleTerm)}>
              <ProfileView
                label="Current Term"
                val={
                  zeroTerm == 0
                    ? terms[0]
                    : term
                    ? terms[term]
                    : terms[user.current_term]
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowsButtons}>
          <Button
            style={styles.editButtonUndo}
            onPress={() => navigation.navigate(routes.profile)}
          >
            <Text style={styles.editButtonTextUndo}>Undo Changes</Text>
          </Button>
          <Button style={styles.editButtonSave} onPress={handleEdit}>
            <Text style={styles.editButtonTextSave}>Save Changes</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  backHeading: {
    width: '100%',
    height: '15%',
  },
  backGroundHeading: {
    flex: 2,
    width: '100%',
    height: '15%',
  },
  profileArea: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    // get half of pfp on background and half not
    bottom: '-40%',
    paddingBottom: '-60%',
    width: '100%',
  },
  profileImg: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  changePicButton: {
    borderRadius: 15,
    width: '30%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#B8B7B7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  changePicButtonText: {
    color: '#007CFF',
    textTransform: 'none',
    fontSize: 11,
  },
  pfpShadow: {
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
  },
  pfInfo: {
    marginTop: '12%',
  },
  rows: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: '1%',
    marginLeft: '4%',
    width: '100%',
  },
  rowsButtons: {
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: '1%',
    width: '100%',
  },
  editButtonSave: {
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#007CFF',
    backgroundColor: '#007CFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editButtonUndo: {
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#B8B7B7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editButtonTextSave: {
    color: '#eeeeee',
    textTransform: 'none',
  },
  editButtonTextUndo: {
    color: '#ff0000',
    textTransform: 'none',
  },
  textLabel: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: '5%',
    marginBottom: '1%',
    color: '#6C6A6A',
  },
  textVal: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginBottom: '3%',
    marginRight: '5%',
    height: 20,
  },
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
  modalPicView: {
    height: '65%',
    width: '90%',
    top: '70%',
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
  openButton: {
    backgroundColor: '#007CFF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  picsButton: {
    backgroundColor: '#007CFF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: '5%',
    width: '40%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOptions: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalPicker: {
    height: '50%',
    width: '100%',
  },
  modalButton: {
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
