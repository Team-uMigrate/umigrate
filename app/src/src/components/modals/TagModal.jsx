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
  ActivityIndicator,
} from 'react-native';
import { UsersEndpoint } from '../../utils/endpoints';
import ProfilePhotoView from '../views/ProfilePhotoView';

const USERTEXTSIZE = 22;

const TagModal = ({ visible, setVisible, taggedUsers, setTaggedUsers }) => {
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [fetchingNewResults, setFetchingNewResults] = useState(false);

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
          <View>
            <Text style={styles.promptText}>Tag friend(s)</Text>
            <View style={{ flexDirection: 'column' }}>
              <TextInput
                style={styles.searchFriendsTextInput}
                placeholder={'Friends...'}
                placeholderTextColor={'#404040'}
                clearTextOnFocus={true}
                onChangeText={(newQuery) => {
                  setFetchingNewResults(true);
                  searchUsers(newQuery).then(() => {
                    setFetchingNewResults(false);
                  });
                }}
              />
              <Text />
              {taggedUsers.map((user, index) => (
                <TaggedUser user={{ name: user }} key={index.toString()} />
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* Box with user search results */}
      <View
        style={[styles.tagModal, { marginTop: '1%', justifyContent: 'center' }]}
      >
        {fetchingNewResults ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={userSearchResults}
            renderItem={({ item }) => <UserButton user={item} />}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={() => (
              <View>
                <Text style={{ textAlign: 'center' }}>No users found.</Text>
              </View>
            )}
          />
        )}
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
              size={USERTEXTSIZE + 10}
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
          <ProfilePhotoView
            photo={user.profile_photo}
            size={USERTEXTSIZE + 10}
            style={{ borderColor: '#A3C8FF', borderWidth: 2 }}
          />
          <Text size={USERTEXTSIZE}>{user.name}</Text>
        </View>
        <IconButton icon={'close'} color={'#404040'} size={USERTEXTSIZE + 4} />
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
    maxHeight: '50%',
    minHeight: '15%',
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
