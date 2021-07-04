import React, { useState } from 'react';
import { Modal, Card, IconButton } from 'react-native-paper';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { UsersEndpoint } from '../../utils/endpoints';
import ProfilePhotoView from '../views/ProfilePhotoView';

const USERTEXTSIZE = 16;

const TagModal = ({ visible, setVisible, taggedUsers, setTaggedUsers }) => {
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [fetchingNewResults, setFetchingNewResults] = useState(false);

  const searchUsers = async (query) => {
    const response = await UsersEndpoint.list(1, { search: query });
    let newUserSearchResults = response.data.results;
    const taggedUserSet = new Set();

    console.log('taggedUsers', taggedUsers);

    if (taggedUsers.length != 0) {
      // Populate set with users that are already tagged
      for (const index in taggedUsers) taggedUserSet.add(taggedUsers[index].id);

      // Iterate through newUserSearchResults and weed out tagged users
      for (let index = 0; index < newUserSearchResults.length; index++) {
        const id = newUserSearchResults[index].id;
        if (taggedUserSet.has(id)) {
          console.log('removed', id);
          // Remove result if already in taggedUsers
          newUserSearchResults.splice(index, 1);
          // The indices have now changed, so the next element's index is equal to the index variable here
          index--;
        }
      }
    }

    setUserSearchResults(newUserSearchResults);
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
                  searchUsers(newQuery)
                    .then(() => {
                      setFetchingNewResults(false);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
              {taggedUsers.map((user) => (
                <TaggedUser user={user} key={user.id.toString()} />
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <UserSearchResult
                user={item}
                taggedUsers={taggedUsers}
                setTaggedUsers={setTaggedUsers}
                userSearchResults={userSearchResults}
                setUserSearchResults={setUserSearchResults}
              />
            )}
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

const UserSearchResult = ({
  user,
  taggedUsers,
  setTaggedUsers,
  userSearchResults,
  setUserSearchResults,
}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // Remove the user you're tagging from the search results (so users can't tag them again)
        let newResults = userSearchResults;
        for (let index in userSearchResults) {
          if (userSearchResults[index].id === user.id) {
            newResults.splice(index, 1);
            break;
          }
        }
        setUserSearchResults(newResults);

        setTaggedUsers(taggedUsers.concat(user));
      }}
    >
      <Card style={styles.userButton}>
        <UserView />
      </Card>
    </TouchableWithoutFeedback>
  );
};

const TaggedUser = ({ user }) => {
  return (
    <Card style={styles.userButton}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.userView}>
          <UserView />
        </View>
        <IconButton icon={'close'} color={'#404040'} size={USERTEXTSIZE} />
      </View>
    </Card>
  );
};

// Helper component to contain stuff common to both TaggedUser and UserSearchResult
const UserView = ({ user }) => (
  <View style={styles.userView}>
    <ProfilePhotoView
      photo={user.profile_photo}
      size={USERTEXTSIZE * 2}
      styles={{
        borderColor: '#A3C8FF',
        borderWidth: 2,
        marginRight: '2%',
      }}
    />
    <Text style={{ fontSize: USERTEXTSIZE }}>
      {user.first_name + ' ' + user.last_name}
    </Text>
  </View>
);

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
  userView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: '1%',
    flexDirection: 'row',
  },
  userButton: {
    borderRadius: 100,
    marginVertical: 3,
    elevation: 5,
    paddingRight: 10,
    paddingVertical: 2,
  },
});
