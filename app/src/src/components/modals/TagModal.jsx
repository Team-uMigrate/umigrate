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
} from 'react-native';

const TEXTSIZE = 12;

const TagModal = ({ visible, setVisible }) => {
  //, taggedUsers, setTaggedUsers }) => {
  const [friendSearchInput, setFriendSearchInput] = useState('');

  const taggedUsers = ['Shashank', 'Shashank', 'Shashank'];
  const userSearchResults = ['Shashank', 'Shashank'];

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
              value={friendSearchInput}
              onChangeText={setFriendSearchInput}
            />
            {taggedUsers.map((user, index) => (
              <TaggedUser user={{ name: user }} key={index} />
            ))}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.tagModal, { marginTop: '1%' }]}>
        {userSearchResults.map((user, index) => (
          <UserButton user={{ name: user }} key={index} />
        ))}
      </View>
    </Modal>
  );
};

const UserButton = ({ user }) => {
  return (
    <TouchableHighlight>
      <Card style={styles.userButton}>
        <Text>{user.name}</Text>
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
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});
