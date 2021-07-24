import React, { useState } from 'react';
import CreatePageTextInput from './CreatePageTextInput';
import { Text, View, StyleSheet } from 'react-native';
import ProfilePhotoView from '../views/ProfilePhotoView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Card, IconButton, Portal } from 'react-native-paper';
import CommunitySelectModal from './CommunitySelectModal';
import ButtonWithDownArrow from './ButtonWithDownArrow';
import { communities } from '../../utils/choices';
import TagModal from '../modals/TagModal';

// Components in the common to all create pages.
// Includes community select modal, button to call it, title input,
// body input, tag and insert image buttons, and an icon for the page.
// The only bits between the different "create" pages that are visually different are the components
// in between the content text input and the tag button, which are passed into this component as children
const BasicCreateForm = ({
  title,
  setTitle,
  body,
  setBody,
  community,
  setCommunity,
  taggedUsers,
  setTaggedUsers,
  profilePhoto,
  pageIconName,
  shareButtonDisabled,
  submitPost,
  children,
}) => {
  const [communitySelectModalVisible, setCommunitySelectModalVisible] =
    useState(false);
  const [tagModalVisible, setTagModalVisible] = useState(false);

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.profilePhotoView}>
          <ProfilePhotoView photo={profilePhoto} />
        </View>
        <View style={styles.communitySelectView}>
          <Text style={{ fontSize: 12 }}>Posting in</Text>
          <View style={{ marginRight: '20%' }}>
            <ButtonWithDownArrow
              onPress={() => {
                setCommunitySelectModalVisible(true);
              }}
              text={communities[community]}
            />
          </View>
        </View>
        <View styles={{ alignSelf: 'flex-end' }}>
          <MaterialCommunityIcons name={pageIconName} size={40} />
        </View>
      </View>

      <CreatePageTextInput
        textValue={title}
        setText={setTitle}
        placeholder={'Write a title...'}
      />

      {/* We have to test this in iOS too, to make sure the text aligns at the top and */}
      {/* that it's bearable to edit with */}
      <CreatePageTextInput
        textValue={body}
        setText={setBody}
        multiline={true}
        numberOfLines={7}
        placeholder={'What would you like to share...'}
        style={{ textAlignVertical: 'top', padding: 10 }}
      />

      {/* This includes all components below the content text input and above the tag and add image buttons. */}
      {/* These are specific to the type of post being made. */}
      {children}

      {/* Buttons to insert images and tag users */}
      <View style={styles.imageAndTagButtonsView}>
        <Card style={{ marginHorizontal: 8, borderRadius: 10 }}>
          <IconButton
            icon={'tag'}
            color={'black'}
            mode={'contained'}
            style={styles.imageAndTagButtons}
            size={28}
            onPress={() => {
              setTagModalVisible(true);
            }}
          />
        </Card>
        <Card style={{ marginHorizontal: 8, borderRadius: 10 }}>
          <IconButton
            icon={'image-plus'}
            color={'black'}
            mode={'contained'}
            style={styles.imageAndTagButtons}
            size={28}
          />
        </Card>
      </View>

      {/* TODO bring these buttons to the bottom */}
      {/* TODO calculate how big the buttons should be */}
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          marginVertical: 10,
        }}
      >
        <Button
          mode={'contained'}
          color={'#8781D0'}
          style={styles.previewAndShareButtons}
          dark={true}
        >
          Preview
        </Button>
        <Button
          mode={'contained'}
          color={'#8781D0'}
          disabled={shareButtonDisabled}
          style={styles.previewAndShareButtons}
          dark={true}
          onPress={submitPost}
        >
          Share
        </Button>
      </View>

      <Portal>
        {/* Community select modal */}
        <CommunitySelectModal
          visible={communitySelectModalVisible}
          setVisible={setCommunitySelectModalVisible}
          community={community}
          setCommunity={setCommunity}
        />
        {/* Tag modal */}
        <TagModal
          visible={tagModalVisible}
          setVisible={setTagModalVisible}
          taggedUsers={taggedUsers}
          setTaggedUsers={setTaggedUsers}
        />
      </Portal>
    </>
  );
};

export default BasicCreateForm;

const styles = StyleSheet.create({
  profilePhotoView: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  communitySelectView: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    flex: 3,
  },
  communitySelectCard: {
    padding: 5,
    paddingLeft: 10,
    elevation: 5,
    borderRadius: 10,
  },
  imageAndTagButtonsView: {
    marginTop: 10,
    alignContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  imageAndTagButtons: {
    alignSelf: 'center',
    borderRadius: 10,
    margin: 0,
  },
  previewAndShareButtons: {
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
});
