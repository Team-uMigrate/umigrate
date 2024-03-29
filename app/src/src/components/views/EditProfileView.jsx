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
import { routes } from '../../utils/routes';
import { setUserData } from '../../utils/storageAccess';
import { communities, pronouns } from '../../utils/choices';
import pickImage from '../common/PickImage';
import BasicModal from '../common/BasicModal';
import CreatePageTextInput from '../common/CreatePageTextInput';
import DropdownList from '../common/DropdownList';
// import WorkEduSection from '../common/WorkEduSection';

const EditProfileView = ({ user, navigation }) => {
  // useStates for user data
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

  // useStates for modal
  const [visibleBirth, setVisibleBirth] = useState(false);

  // useState for datetimepicker
  const [date, setDate] = useState(new Date());

  // useStates for stupid react native picker defaulting 0
  const [zeroPronoun, setZeroPronoun] = useState();
  const [zeroReg, setZeroReg] = useState();

  const handleEdit = async () => {
    try {
      const response = await ProfileEndpoint.patch({
        profile_photo: pfp ?? '',
        background_photo: bgPic ?? '',
        preferred_name: prefName ?? user.preferred_name,
        first_name: fName ?? user.first_name,
        last_name: lName ?? user.last_name,
        phone_number: phone ?? user.phone_number,
        pronouns: zeroPronoun == 0 ? 0 : pronoun ?? user.pronouns,
        birthday: birth ?? user.birthday,
        community: zeroReg == 0 ? 0 : comm ?? user.community,
        bio: bio ?? user.bio,
      });
      if (response) {
        await setUserData(response.data);
        navigation.navigate(routes.profile);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <BasicModal
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
              source={{
                uri: bgPic ?? user.background_photo ?? '//:0',
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                }}
                onPress={async () => {
                  await pickImage({
                    set: setbgPic,
                  });
                }}
              >
                <View style={{ ...styles.wrenchButton, margin: '5%' }}>
                  <IconButton
                    icon={'wrench'}
                    color={'#483FAB'}
                    style={styles.iconBtn}
                    size={24}
                    onPress={async () => {
                      await pickImage({
                        set: setbgPic,
                      });
                    }}
                  />
                </View>
              </TouchableOpacity>
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
                  color={'#483FAB'}
                  style={styles.iconBtn}
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
                  source={{
                    uri: pfp ?? user.profile_photo ?? '//:0',
                  }}
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
                  user.preferred_name ? '' : 'Add your preferred name...'
                }
                style={styles.textVal}
                profileEdit={true}
                maxlength={50}
                textDefault={user.preferred_name ?? ''}
              />
            </View>
            <View>
              <Text style={styles.textLabel}>First name</Text>
              <CreatePageTextInput
                textValue={fName}
                setText={setFName}
                placeholder={user.first_name ? '' : 'Add your first name...'}
                style={styles.textVal}
                profileEdit={true}
                maxlength={50}
                textDefault={user.first_name ?? ''}
              />
            </View>
            <View>
              <Text style={styles.textLabel}>Last name</Text>
              <CreatePageTextInput
                textValue={lName}
                setText={setLName}
                placeholder={user.last_name ? '' : 'Add your last name...'}
                style={styles.textVal}
                profileEdit={true}
                maxlength={50}
                textDefault={user.last_name ?? ''}
              />
            </View>
            <View>
              <Text style={styles.textLabel}>Email</Text>
              <CreatePageTextInput
                textValue={email}
                placeholder={user.email}
                style={styles.textVal}
                profileEdit={true}
                textDefault={user.email}
                edit={false}
              />
            </View>
            <View>
              <Text style={styles.textLabel}>Phone</Text>
              <CreatePageTextInput
                textValue={phone}
                setText={setPhone}
                placeholder={
                  user.phone_number ? '' : 'Add your phone number...'
                }
                style={styles.textVal}
                profileEdit={true}
                maxlength={15}
                textDefault={user.phone_number ?? ''}
              />
            </View>
            <View style={styles.rows}>
              <View style={{ width: '50%', zIndex: 999 }}>
                <Text
                  style={{
                    ...styles.textLabel,
                    marginBottom: '2%',
                    marginLeft: '-1%',
                  }}
                >
                  Community
                </Text>
                <View style={styles.communityDropdown}>
                  <DropdownList
                    text={'Region'}
                    set={setComm}
                    setZero={setZeroReg}
                    choices={communities}
                    currVal={comm ?? user.community}
                    currChoice={
                      zeroReg == 0
                        ? communities[0]
                        : comm
                        ? communities[comm]
                        : communities[user.community]
                    }
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setVisibleBirth(!visibleBirth)}
                style={{ maxHeight: '50%' }}
              >
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
            <View style={styles.pronounDropdown}>
              <DropdownList
                text={'Pronoun'}
                set={setPronoun}
                setZero={setZeroPronoun}
                choices={pronouns}
                currVal={pronoun ?? user.pronouns}
                currChoice={
                  zeroPronoun == 0
                    ? pronouns[0]
                    : pronoun
                    ? pronouns[pronoun]
                    : pronouns[user.pronouns]
                }
              />
            </View>
            <View>
              <Text style={styles.textLabel}>Bio</Text>
              <CreatePageTextInput
                textValue={bio}
                setText={setBio}
                placeholder={user.bio ? '' : 'Add your bio...'}
                style={{ ...styles.textVal, height: 50 }}
                multiline={true}
                numberOfLines={3}
                profileEdit={true}
                maxlength={1000}
                textDefault={user.bio ?? ''}
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
          {/* Will be used for education/jobs section of edit profile page
          <View style={styles.about}>
            <Text style={styles.aboutText}>About</Text>
          </View>
          <WorkEduSection type={'edu'} jobs={jobs} />
          <WorkEduSection type={'work'} jobs={jobs} />
        */}
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
    backgroundColor: '#FFF',
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
  iconBtn: {
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
    paddingBottom: '5%',
    justifyContent: 'space-between',
    marginLeft: '5%',
    width: '93%',
    zIndex: 2000,
  },
  communityDropdown: {
    paddingBottom: Platform.OS === 'android' ? '60%' : '20%',
    width: Platform.OS === 'android' ? '95%' : '85%',
  },
  pronounDropdown: {
    paddingBottom: Platform.OS === 'android' ? '30%' : '10%',
    width: Platform.OS === 'android' ? '52%' : '42%',
    alignSelf: 'center',
    zIndex: 999,
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
    paddingTop: '8%',
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
    borderColor: '#483FAB',
    backgroundColor: '#483FAB',
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
    backgroundColor: '#FFF',
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
    color: '#404040',
  },
  textVal: {
    fontSize: 14,
    textAlign: 'left',
    marginLeft: '5%',
    marginRight: '5%',
    height: 30,
    bottom: '15%',
  },
});
