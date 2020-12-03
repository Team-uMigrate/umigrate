import React, { useState } from 'react';
import CreatePageTextInput from './CreatePageTextInput';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import ProfilePhoto from '../common/ProfilePhoto';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, Modal, Portal } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { Choices } from '../../utils/endpoints';

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
  const [
    communitySelectModalVisible,
    setCommunitySelectModalVisible,
  ] = useState(false);

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.profilePhotoView}>
          <ProfilePhoto photo={profilePhoto} />
        </View>
        <View style={styles.communitySelectView}>
          <Text style={{ fontSize: 12 }}>Posting in</Text>
          <TouchableHighlight
            onPress={() => {
              setCommunitySelectModalVisible(true);
            }}
            style={{ marginRight: '25%' }}
            underlayColor={
              '#F2F2F2' /* TODO change this to white once we change the background colour */
            }
            activeOpacity={1}
          >
            <Card style={styles.communitySelectCard}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {/* Todo montserrat here */}
                <Text style={{ fontSize: 14, color: '#8781D0' }}>
                  {Choices.regions[community]}
                </Text>
                <Entypo
                  name="triangle-down"
                  style={{ alignSelf: 'center' }}
                  size={16}
                  color="black"
                />
              </View>
            </Card>
          </TouchableHighlight>
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
        <Modal
          visible={communitySelectModalVisible}
          onDismiss={() => {
            setCommunitySelectModalVisible(false);
          }}
          contentContainerStyle={styles.communitySelectModal}
        >
          <Text style={styles.selectCommunityPromptText}>
            Select Other Region
          </Text>
          {/* These 2 nested views create a 1px wide border around the text input */}
          <View
            style={{
              backgroundColor: '#D9D9D9',
              borderRadius: 20,
              padding: 1,
              marginBottom: 5,
            }}
          >
            <View style={{ backgroundColor: 'white', borderRadius: 20 }}>
              <TextInput
                style={styles.searchRegionTextInput}
                placeholder={'Search Other Region...'}
                placeholderTextColor={'#D9D9D9'}
              />
            </View>
          </View>
          {Choices.regions.slice(0, 4).map((item, index) => {
            const selected = Choices.regions[community] === item;

            return (
              <TouchableHighlight
                key={index}
                onPress={() => {
                  setCommunity(index);
                }}
                activeOpacity={1}
                underlayColor={'white'}
              >
                <Card
                  style={{
                    ...styles.communityOptionButton,
                    backgroundColor: selected ? '#8781D0' : 'white',
                  }}
                >
                  <Text style={{ color: selected ? 'white' : 'black' }}>
                    {item}
                  </Text>
                </Card>
              </TouchableHighlight>
            );
          })}
        </Modal>
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
  communitySelectModal: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: '10%',
  },
  searchRegionTextInput: {
    borderRadius: 20,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  selectCommunityPromptText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 5,
  },
  communityOptionButton: {
    borderRadius: 20,
    paddingLeft: 10,
    padding: 5,
    elevation: 3,
    marginBottom: 7,
  },
});
