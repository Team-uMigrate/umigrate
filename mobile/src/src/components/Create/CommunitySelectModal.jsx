import React, { useState } from 'react';
import { Card, Divider, Modal, Portal } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Choices } from '../../utils/endpoints';

const CommunitySelectModal = ({
  visible,
  setVisible,
  community,
  setCommunity,
}) => {
  // The options that get shown in the modal while the search bar is unfocused
  // default options are set to the first 4 options
  const [shownCommunityChoices, setShownCommunityChoices] = useState([
    0,
    1,
    2,
    3,
  ]);
  const [communitySearchFocused, setCommunitySearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState(shownCommunityChoices);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Modal
      visible={visible}
      onDismiss={() => {
        setVisible(false);
        setVisible(false);
      }}
      contentContainerStyle={styles.communitySelectModal}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          // console.log('search focused: ', communitySearchFocused);
          setCommunitySearchFocused(false);
          Keyboard.dismiss();
        }}
      >
        {/*TouchableWithoutFeedback only accepts one child, so we have to encapsulate its contents in a view*/}
        {/* This also gives the user a bit of blank space to tap on to exit the search bar with */}
        <View style={{ paddingBottom: '15%' }}>
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
                style={styles.searchCommunityTextInput}
                placeholder={'Search Other Region...'}
                placeholderTextColor={'#D9D9D9'}
                clearTextOnFocus={true}
                onFocus={() => {
                  setCommunitySearchFocused(true);
                  // If someone leaves the search bar with text in it, then brings up the search menu again,
                  // the existing options persist
                  if (searchQuery === '')
                    setSearchResults(shownCommunityChoices);
                }}
                onBlur={() => {
                  setCommunitySearchFocused(false);
                  Keyboard.dismiss();
                }}
                onEndEditing={() => setCommunitySearchFocused(false)}
                value={searchQuery}
                onChangeText={(newText) => {
                  setSearchQuery(newText);
                  // TODO insert into list in order of "closeness" to the query
                  // Defaults to the buttons shown before searching
                  if (newText === '') setSearchResults(shownCommunityChoices);
                  else {
                    newText = newText.toUpperCase();
                    let newResults = [];
                    for (const [
                      index,
                      community,
                    ] of Choices.regions.entries()) {
                      if (community.toUpperCase().includes(newText))
                        newResults.push(index);
                    }
                    setSearchResults(newResults);
                  }
                }}
              />
            </View>
          </View>
          {/* Show 4 default options when the search bar isn't selected */}
          {!communitySearchFocused &&
            shownCommunityChoices.map((item, index) => {
              const selected = community === item;

              return (
                //  We could use a react native paper Chip component here,
                // But then the touchable area will only be where the text is.
                // This way, we can click anywhere on the card to select it
                <TouchableHighlight
                  key={index}
                  onPress={() => {
                    Keyboard.dismiss();
                    setCommunity(item);
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
                      {Choices.regions[item]}
                    </Text>
                  </Card>
                </TouchableHighlight>
              );
            })}

          {communitySearchFocused && (
            <Card style={styles.communitySearchResultsCard}>
              {searchResults.map((item, index) => {
                // TODO filter what's shown here
                return (
                  <View key={index}>
                    <TouchableHighlight
                      style={styles.communitySearchResult}
                      activeOpacity={1}
                      underlayColor={'#8781D0'}
                      onPress={() => {
                        Keyboard.dismiss();
                        setCommunity(item);
                        setCommunitySearchFocused(false);

                        let newChoices = Object.assign(
                          [],
                          shownCommunityChoices
                        );

                        // Index of the selected search result
                        const i = shownCommunityChoices.indexOf(item);

                        if (i == -1) {
                          // Remove last item from the column of buttons
                          // and push the selected one to the beginning
                          newChoices.splice(newChoices.length - 1);
                          newChoices.unshift(item);
                        } else {
                          // If the button is already being shown, reorder them so that
                          // this selected one is first
                          newChoices.splice(i, 1);
                          newChoices.unshift(item);
                        }
                        setShownCommunityChoices(newChoices);
                      }}
                    >
                      <Text>{Choices.regions[item]}</Text>
                    </TouchableHighlight>
                    {/* Show divider if this is not the last item */}
                    {index < shownCommunityChoices.length - 1 && <Divider />}
                  </View>
                );
              })}
            </Card>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CommunitySelectModal;

const styles = StyleSheet.create({
  communitySelectModal: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: '10%',
  },
  selectCommunityPromptText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 5,
  },
  searchCommunityTextInput: {
    borderRadius: 20,
    paddingLeft: 10,
    paddingVertical: 5,
  },
  communityOptionButton: {
    borderRadius: 20,
    paddingLeft: 10,
    padding: 5,
    elevation: 3,
    marginBottom: 7,
  },
  communitySearchResultsCard: {
    borderRadius: 15,
    elevation: 4,
  },
  communitySearchResult: {
    paddingLeft: 10,
    paddingVertical: 7,
  },
});
