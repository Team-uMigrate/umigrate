import React, { useState } from 'react';
import CreatePageTextInput from './CreatePageTextInput';
import { Text, View, StyleSheet } from 'react-native';
import ProfilePhotoView from '../views/ProfilePhotoView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Portal } from 'react-native-paper';
import CommunitySelectModal from './CommunitySelectModal';
import ButtonWithDownArrow from './ButtonWithDownArrow';
import { communities } from '../../utils/choices';

// Components in the common to all create pages
// Includes community select modal, button to call it, title input,
// body input, and an icon for the page
const BasicCreateForm = ({
  title,
  setTitle,
  body,
  setBody,
  community,
  setCommunity,
  profilePhoto,
  pageIconName,
}) => {
  const [communitySelectModalVisible, setCommunitySelectModalVisible] =
    useState(false);

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

      {/* Community select modal */}
      <Portal>
        <CommunitySelectModal
          visible={communitySelectModalVisible}
          setVisible={setCommunitySelectModalVisible}
          community={community}
          setCommunity={setCommunity}
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
});
