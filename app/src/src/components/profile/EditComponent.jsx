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
import { Choices, ProfileEndpoint, setUserData } from '../../utils/endpoints';
import Header from '../Header';
import ProfileComponents from './ProfileComponents';
import * as ImagePicker from 'expo-image-picker';

const EditComponent = ({ user, navigation }) => {
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
      navigation.navigate('Profile');
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

  // used 2 pick image functions or else the photo library appears by itself
  const pickImage1 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const imagePath = result.uri;
      const imageExt = result.uri.split('.').pop();
      const imageMime = `image/${imageExt}`;
      const filename = result.uri.split('/').pop();

      const picture = await fetch(imagePath);
      const blobPicture = await picture.blob();

      const imageData = new File([blobPicture], filename);

      const formData = new FormData();
      formData.append(filename, blobPicture);

      const reader = new FileReader();
      reader.readAsDataURL(blobPicture);
      reader.onloadend = () => {
        setPfp(reader.result);
        // set setPfpFile to formData or imageData or something else...
      };
    }
  };

  const pickImage2 = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const imagePath = result.uri;
      const imageExt = result.uri.split('.').pop();
      const imageMime = `image/${imageExt}`;
      const filename = result.uri.split('/').pop();

      const picture = await fetch(imagePath);
      const blobPicture = await picture.blob();

      const imageData = new File([blobPicture], filename);

      const formData = new FormData();
      formData.append(filename, blobPicture);

      const reader = new FileReader();
      reader.readAsDataURL(blobPicture);
      reader.onloadend = () => {
        setbgPic(reader.result);
        // set setbgPicFile to formData or imageData or something else...
      };
    }
  };

  const getOptions = (type) => {
    var temp = [];
    var tempChoice =
      type == 'Pronoun'
        ? Choices.pronouns
        : type == 'Region'
        ? Choices.communities
        : type == 'Program'
        ? Choices.programs
        : type == 'Current Term'
        ? Choices.terms
        : '';

    if (tempChoice.length) {
      for (let i = 0; i < tempChoice.length; i++) {
        temp.push(
          <Picker.Item
            key={i}
            label={tempChoice[i]}
            value={i}
            style={styles.modalOptions}
          />
        );
      }
    }
    return temp;
  };

  const onPickerChange = (itemValue, itemIndex, type) => {
    var zero = 999;
    if (itemValue == 0) {
      zero = 0;
    }
    if (type == 'Pronoun') {
      setZeroPronoun(zero);
      setPronoun(itemValue);
    } else if (type == 'Region') {
      setZeroReg(zero);
      setRegion(itemValue);
    } else if (type == 'Program') {
      setZeroPro(zero);
      setProgram(itemValue);
    } else if (type == 'Current Term') {
      setZeroTerm(zero);
      setTerm(itemValue);
    }
  };

  const getSpecificModal = (type) => {
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Pick a {type} Option!</Text>
          <View style={styles.modalButton}>
            <Picker
              selectedValue={
                type == 'Pronoun'
                  ? pronoun
                  : type == 'Region'
                  ? reg
                  : type == 'Program'
                  ? program
                  : type == 'Current Term'
                  ? term
                  : ''
              }
              style={styles.modalPicker}
              onValueChange={(itemValue, itemIndex) =>
                onPickerChange(itemValue, itemIndex, type)
              }
            >
              <Picker.Item label="--Options--" style={styles.modalOptions} />
              {getOptions(type)}
            </Picker>
          </View>
          <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
              type == 'Pronoun'
                ? setVisiblePronoun(!visiblePronoun)
                : type == 'Region'
                ? setVisibleReg(!visibleReg)
                : type == 'Program'
                ? setVisiblePro(!visiblePro)
                : type == 'Current Term'
                ? setVisibleTerm(!visibleTerm)
                : '';
            }}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  const onDateChange = (event, selectedValue) => {
    setDate(selectedValue);
    const currYear = selectedValue.getFullYear().toString();
    const currMonth =
      selectedValue.getMonth() < 10
        ? ('0' + (selectedValue.getMonth() + 1)).toString().slice(-2)
        : (selectedValue.getMonth() + 1).toString().slice(-2);
    const currDay =
      selectedValue.getDate() < 10
        ? ('0' + selectedValue.getDate()).toString().slice(-2)
        : selectedValue.getDate().toString().slice(-2);
    const currDate = currYear + '-' + currMonth + '-' + currDay;
    setBirth(currDate);
  };

  const getBirthModal = (type) => {
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Pick your {type}!</Text>
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
              value={date}
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
            onPress={() => setVisibleBirth(!visibleBirth)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  const getPicsModal = () => {
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalPicView}>
          <Text style={styles.modalText}>Choose a picture to change!</Text>
          <View style={styles.modalButton}>
            <TouchableHighlight style={styles.picsButton} onPress={pickImage1}>
              <Text style={styles.textStyle}>Profile</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.picsButton} onPress={pickImage2}>
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
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visiblePronoun}
          hardwareAccelerated={true}
          onRequestClose={() => setVisiblePronoun(false)}
        >
          {getSpecificModal('Pronoun')}
        </Modal>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visibleReg}
          hardwareAccelerated={true}
          onRequestClose={() => setVisibleReg(false)}
        >
          {getSpecificModal('Region')}
        </Modal>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visiblePro}
          hardwareAccelerated={true}
          onRequestClose={() => setVisiblePro(false)}
        >
          {getSpecificModal('Program')}
        </Modal>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visibleTerm}
          hardwareAccelerated={true}
          onRequestClose={() => setVisibleTerm(false)}
        >
          {getSpecificModal('Current Term')}
        </Modal>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visibleBirth}
          hardwareAccelerated={true}
          onRequestClose={() => setVisibleBirth(false)}
        >
          {getBirthModal('Birthday')}
        </Modal>
      </View>
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
            onPress={() => navigation.navigate('Menu')}
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
            <ProfileComponents label="First name" val={user.first_name} />
            <ProfileComponents
              label="Last name"
              val={user.last_name}
              row={true}
            />
          </View>
          <View>
            <ProfileComponents label="Email" val={user.email} />
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
              <ProfileComponents
                label="Pronoun"
                val={
                  zeroPronoun == 0
                    ? Choices.pronouns[0]
                    : pronoun
                    ? Choices.pronouns[pronoun]
                    : Choices.pronouns[user.pronouns]
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleBirth(!visibleBirth)}>
              <ProfileComponents
                label="Birthday"
                val={birth ? birth : user.birthday}
                row={true}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => setVisibleReg(!visibleReg)}>
              <ProfileComponents
                label="Community"
                val={
                  zeroReg == 0
                    ? Choices.communities[0]
                    : reg
                    ? Choices.communities[reg]
                    : Choices.communities[user.community]
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisiblePro(!visiblePro)}>
              <ProfileComponents
                label="Program"
                val={
                  zeroPro == 0
                    ? Choices.programs[0]
                    : program
                    ? Choices.programs[program]
                    : Choices.programs[user.enrolled_program]
                }
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisibleTerm(!visibleTerm)}>
              <ProfileComponents
                label="Current Term"
                val={
                  zeroTerm == 0
                    ? Choices.terms[0]
                    : term
                    ? Choices.terms[term]
                    : Choices.terms[user.current_term]
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowsButtons}>
          <Button
            style={styles.editButtonUndo}
            onPress={() => navigation.navigate('Profile')}
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

export default EditComponent;

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
