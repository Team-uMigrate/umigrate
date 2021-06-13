import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Avatar, Button, IconButton } from 'react-native-paper';
import { ProfileEndpoint } from '../../utils/endpoints';
import Header from './Header';
import ProfileView from './ProfileView';
import * as ImagePicker from 'expo-image-picker';
import { routes } from '../../utils/routes';
import { setUserData } from '../../utils/storageAccess';
import { communities, programs, pronouns, terms } from '../../utils/choices';
import pickImage from '../common/PickImage';
import BasicModal from '../common/BasicModal';
import CreatePageTextInput from '../common/CreatePageTextInput';
import ButtonWithDownArrow from '../common/ButtonWithDownArrow';

const EditProfileView = ({ user, navigation }) => {
  // useStates for data
  const [bgPic, setbgPic] = useState(null);
  const [pfp, setPfp] = useState(null);
  const [prefName, setPrefName] = useState(user.preferred_name);
  const [fName, setFName] = useState(user.first_name);
  const [lName, setLName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone_number);
  const [pronoun, setPronoun] = useState(user.pronouns);
  const [birth, setBirth] = useState(user.birthday);
  const [comm, setComm] = useState(user.community);
  const [bio, setBio] = useState(user.bio);
  const [program, setProgram] = useState(user.enrolled_program);
  const [term, setTerm] = useState(user.current_term);

  // useStates for modal
  const [visiblePronoun, setVisiblePronoun] = useState(false);
  const [visibleReg, setVisibleReg] = useState(false);
  const [visiblePro, setVisiblePro] = useState(false);
  const [visibleTerm, setVisibleTerm] = useState(false);
  const [visibleBirth, setVisibleBirth] = useState(false);

  // useState for datetimepicker
  const [date, setDate] = useState(new Date());

  // useStates for stupid react native picker defaulting 0
  const [zeroPronoun, setZeroPronoun] = useState();
  const [zeroReg, setZeroReg] = useState();
  const [zeroPro, setZeroPro] = useState();
  const [zeroTerm, setZeroTerm] = useState();

  const handleEdit = async () => {
    const result = await ProfileEndpoint.patch({
      profile_photo: pfp ? pfp : '',
      background_photo: bgPic ? bgPic : '',
      preferred_name: prefName ? prefName : user.preferred_name,
      phone_number: phone ? phone : user.phone_number,
      pronouns: zeroPronoun == 0 ? 0 : pronoun ? pronoun : user.pronouns,
      birthday: birth ? birth : user.birthday,
      community: zeroReg == 0 ? 0 : comm ? comm : user.community,
      enrolled_program:
        zeroPro == 0 ? 0 : program ? program : user.enrolled_program,
      current_term: zeroTerm == 0 ? 0 : term ? term : user.current_term,
      bio: bio ? bio : user.bio,
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
        type={comm}
        setType={setComm}
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
      <Header title="Edit Profile" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.backHeading}>
            <ImageBackground
              style={styles.backGroundHeading}
              source={{ uri: bgPic ? bgPic : user.background_photo }}
            >
              <View style={{ ...styles.wrenchButton, margin: '5%' }}>
                <IconButton
                  icon={'wrench'}
                  color={'#5341A9'}
                  style={styles.wrench}
                  size={24}
                  onPress={async () => {
                    await pickImage({
                      set: setbgPic,
                    });
                  }}
                />
              </View>
            </ImageBackground>
            <View style={styles.profileArea}>
              <View
                style={{
                  ...styles.wrenchButton,
                  marginRight: '33%',
                  top: '35%',
                }}
              >
                <IconButton
                  icon={'wrench'}
                  color={'#5341A9'}
                  style={styles.wrench}
                  size={24}
                  onPress={async () => {
                    await pickImage({
                      set: setPfp,
                    });
                  }}
                />
              </View>
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
          <View style={styles.pfInfo}>
            <View>
              <Text style={styles.textLabel}>Preferred name</Text>
              <CreatePageTextInput
                textValue={prefName}
                setText={setPrefName}
                placeholder={
                  user.preferred_name
                    ? user.preferred_name
                    : 'Add your preferred name...'
                }
                style={styles.textVal}
                profileEdit={prefName ? true : user.preferred_name}
                maxlength={50}
              />
            </View>
            <View>
              <Text style={styles.textLabel}>First name</Text>
              <CreatePageTextInput
                textValue={fName}
                setText={setFName}
                placeholder={
                  user.first_name ? user.first_name : 'Add your first name...'
                }
                style={styles.textVal}
                profileEdit={fName ? true : user.first_name}
                maxlength={50}
              />
            </View>
            <View>
              <Text style={styles.textLabel}>Last name</Text>
              <CreatePageTextInput
                textValue={lName}
                setText={setLName}
                placeholder={
                  user.last_name ? user.last_name : 'Add your last name...'
                }
                style={styles.textVal}
                profileEdit={lName ? true : user.last_name}
                maxlength={50}
              />
            </View>
            <View>
              <Text style={styles.textLabel}>Email</Text>
              <CreatePageTextInput
                textValue={email}
                setText={setEmail}
                placeholder={user.email ? user.email : 'Add your email...'}
                style={styles.textVal}
                profileEdit={email ? true : user.email}
                edit={false}
              />
            </View>
            <View>
              <Text style={styles.textLabel}>Phone</Text>
              <CreatePageTextInput
                textValue={phone}
                setText={setPhone}
                placeholder={
                  user.phone_number
                    ? user.phone_number
                    : 'Add your phone number...'
                }
                style={styles.textVal}
                profileEdit={phone ? true : user.phone_number}
                maxlength={15}
              />
            </View>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => setVisibleReg(!visibleReg)}>
                <Text style={styles.textLabel}>Region</Text>
                <CreatePageTextInput
                  textValue={
                    zeroReg == 0
                      ? communities[0]
                      : comm
                      ? communities[comm]
                      : communities[user.community]
                  }
                  placeholder={communities[user.community]}
                  style={styles.textVal}
                  edit={false}
                  profileEdit={true}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisibleBirth(!visibleBirth)}>
                <Text style={styles.textLabel}>Birthday</Text>
                <CreatePageTextInput
                  textValue={birth}
                  placeholder={user.birthday}
                  style={styles.textVal}
                  edit={false}
                  profileEdit={true}
                />
              </TouchableOpacity>
            </View>
            <View>
              <View style={styles.pronounDropdown}>
                <ButtonWithDownArrow
                  onPress={() => {
                    setVisiblePronoun(true);
                  }}
                  text={
                    zeroPronoun == 0
                      ? pronouns[0]
                      : pronoun
                      ? pronouns[pronoun]
                      : pronouns[user.pronouns]
                  }
                  textColour={'#000'}
                />
              </View>
            </View>
            <View>
              <Text style={styles.textLabel}>Bio</Text>
              <CreatePageTextInput
                textValue={bio}
                setText={setBio}
                placeholder={user.bio ? user.bio : 'Add your bio...'}
                style={{ ...styles.textVal, height: 50 }}
                multiline={true}
                numberOfLines={3}
                profileEdit={bio ? true : user.bio}
                maxlength={1000}
              />
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
          <View style={styles.about}>
            <Text style={styles.aboutText}>About</Text>
          </View>
          <View>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditProfileView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#eeeeee',
  },
  scrollView: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  contentContainer: {
    paddingBottom: '30%',
  },
  wrenchButton: {
    backgroundColor: '#FFF',
    width: '10%',
    borderRadius: 10,
    alignSelf: 'flex-end',
    shadowOpacity: 0.2,
    elevation: 6,
    zIndex: 999,
  },
  wrench: {
    alignSelf: 'center',
    margin: 0,
  },
  backHeading: {
    width: '100%',
    height: '20%',
  },
  backGroundHeading: {
    flex: 2,
    width: '100%',
    height: '100%',
  },
  profileArea: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    // get half of pfp on background and half not
    bottom: '-30%',
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
    justifyContent: 'space-between',
    marginLeft: '4%',
    width: '93%',
  },
  pronounDropdown: {
    width: '30%',
    alignSelf: 'center',
  },
  about: {
    width: '100%',
    padding: '5%',
  },
  aboutText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
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
    borderColor: '#5341A9',
    backgroundColor: '#5341A9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editButtonUndo: {
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  editButtonTextSave: {
    color: '#eeeeee',
    textTransform: 'none',
  },
  editButtonTextUndo: {
    color: '#000',
    textTransform: 'none',
  },
  textLabel: {
    fontSize: 12,
    textAlign: 'left',
    marginLeft: '5%',
    color: '#6C6A6A',
  },
  textVal: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: '5%',
    marginRight: '5%',
    height: 30,
    bottom: '15%',
  },
});
