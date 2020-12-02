import React from 'react';
import CreatePageTextInput from './CreatePageTextInput';
import { Text, View, StyleSheet } from 'react-native';
import ProfilePhoto from '../common/ProfilePhoto';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Components in the common to all create pages
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
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.profilePhotoView}>
          <ProfilePhoto photo={profilePhoto} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'flex-start',
            flex: 3,
          }}
        >
          <Text>Posting in</Text>
          <Text style={styles.userNameText}>
            {'Waterloo' /* TODO picker */}
          </Text>
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
    </>
  );
};

export default BasicCreateForm;

const styles = StyleSheet.create({
  profilePhotoView: {
    flex: 1,
    alignSelf: 'flex-start',
  },
});
