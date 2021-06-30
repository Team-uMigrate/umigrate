import React, { useState } from 'react';
import { Modal, Card, IconButton } from 'react-native-paper';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import { UsersEndpoint } from '../../utils/endpoints';
import ProfilePhotoView from '../views/ProfilePhotoView';

const TEXTSIZE = 16;

const TagModal = ({ visible, setVisible }) => {
  //, taggedUsers, setTaggedUsers }) => {

  const taggedUsers = ['Shashank', 'Shashank', 'Shashank'];
  const [userSearchResults, setUserSearchResults] = useState([]);

  const searchUsers = async (query) => {
    const response = await UsersEndpoint.list(1, { search: query });
    setUserSearchResults(response.data.results);
  };

  return (
    <Modal
      visible={visible}
      onDismiss={() => {
        setVisible(false);
      }}
    >
      <View style={styles.tagModal}>
        {/* Used to exit the search bar of the modal without exiting the modal itself */}
        {/* For some reason, you can't just tap anywhere on the modal to dismiss the keyboard by default */}
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={{ paddingBottom: '5%' }}>
            <Text style={styles.promptText}>Tag friend(s)</Text>
            <TextInput
              style={styles.searchFriendsTextInput}
              placeholder={'Friends...'}
              placeholderTextColor={'#404040'}
              clearTextOnFocus={true}
              onChangeText={(newQuery) => {
                searchUsers(newQuery); // TODO add activityIndicator while users being queried
              }}
            />
            {taggedUsers.map((user, index) => (
              <TaggedUser user={{ name: user }} key={index.toString()} />
            ))}
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* Box with user search results */}
      <View style={[styles.tagModal, { marginTop: '1%' }]}>
        <FlatList
          data={userSearchResults}
          renderItem={({ item }) => <UserButton user={item} />}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    </Modal>
  );
};

const UserButton = ({ user }) => {
  return (
    <TouchableHighlight>
      <Card style={styles.userButton}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center', marginRight: '1%' }}>
            <ProfilePhotoView
              photo={user.profile_photo}
              size={TEXTSIZE + 10}
              style={{ borderColor: '#A3C8FF', borderWidth: 2 }}
            />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text>{user.first_name + ' ' + user.last_name}</Text>
          </View>
        </View>
      </Card>
    </TouchableHighlight>
  );
};

const TaggedUser = ({ user }) => {
  return (
    <Card style={styles.userButton}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ justifyContent: 'center' }}>
          <Text size={TEXTSIZE}>{user.name}</Text>
        </View>
        <IconButton icon={'close'} color={'#404040'} size={TEXTSIZE + 4} />
      </View>
    </Card>
  );
};

export default TagModal;

const styles = StyleSheet.create({
  // TODO same as modal from communitySelectModal; make shared style
  tagModal: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: '10%',
    maxHeight: '45%',
  },
  promptText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 5,
  },
  // TODO same as the text input from communitySelectModal; make shared style
  searchFriendsTextInput: {
    borderRadius: 20,
    paddingLeft: 10,
    paddingVertical: 5,
    marginBottom: 5,
    backgroundColor: '#D9D9D9',
  },
  userButton: {
    borderRadius: 100,
    marginVertical: 3,
    elevation: 5,
    paddingRight: 10,
    paddingVertical: 2,
  },
});
