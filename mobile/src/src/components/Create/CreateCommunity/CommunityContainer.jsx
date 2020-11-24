import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Header from '../../common/Header';
import PostTypeOptionsButton from './PostTypeOptionsButton';
import ProfilePhoto from '../../common/ProfilePhoto';
import { ProfileEndpoint } from '../../../utils/endpoints';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, IconButton, Button } from 'react-native-paper';
import CreatePageTextInput from '../CreatePageTextInput';

class CommunityContainer extends React.Component {
  state = {
    user: { profile_photo: null },
    selectedPostType: '',
    setSelectedPostType: (newValue) => {
      this.setState({ selectedPostType: newValue });
    },
    title: '',
    body: '',
    pollOptions: [''],
    eventStartTime: '',
    eventEndTime: '',
    eventLocation: '',
    eventAdmissionPrice: '',
  };

  componentDidMount = () => {
    this.getProfile();
  };

  getProfile = () => {
    ProfileEndpoint.get(
      (response) => {
        this.setState({ user: response.data });
      },
      (error) => {
        console.log('error', error);
        console.log('error response', error.response);
      }
    );
  };

  render() {
    console.log(this.state);
    return (
      <ScrollView styles={styles.container}>
        <Header title={'New Community Post'} isMessagingPage={true} />
        <View style={styles.postTypeOptionsContainer}>
          {/* TODO investigate laggy button response */}
          <PostTypeOptionsButton
            title={'Post'}
            selectedPostType={this.state.selectedPostType}
            setSelectedPostType={this.state.setSelectedPostType}
          />
          <PostTypeOptionsButton
            title={'Poll'}
            selectedPostType={this.state.selectedPostType}
            setSelectedPostType={this.state.setSelectedPostType}
          />
          <PostTypeOptionsButton
            title={'Event'}
            selectedPostType={this.state.selectedPostType}
            setSelectedPostType={this.state.setSelectedPostType}
          />
        </View>

        <View style={styles.formContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.profilePhotoView}>
              <ProfilePhoto photo={this.state.user.profile_photo} />
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'flex-start',
                flex: 3,
              }}
            >
              <Text>Posting as</Text>
              <Text style={styles.userNameText}>
                {this.state.user.preferred_name}
              </Text>
            </View>
            <View styles={{ alignSelf: 'flex-end' }}>
              <MaterialCommunityIcons name={'account-group'} size={40} />
            </View>
          </View>

          <CreatePageTextInput
            textValue={this.state.title}
            setText={(newText) => {
              this.setState({ title: newText });
            }}
            placeholder={'Write a title...'}
          />

          {/* We have to test this in iOS too, to make sure the text aligns at the top and */}
          {/* that it's bearable to edit with */}
          <CreatePageTextInput
            textValue={this.state.body}
            setText={(newText) => {
              this.setState({ body: newText });
            }}
            multiline={true}
            numberOfLines={7}
            placeholder={'What would you like to share...'}
            style={{ textAlignVertical: 'top', padding: 10 }}
          />

          {/* Render list of poll options and new poll option button if the poll button is selected */}
          {this.state.selectedPostType === 'Poll' && (
            <>
              {this.state.pollOptions.map((pollText, index) => {
                return (
                  <View key={index.toString()}>
                    <CreatePageTextInput
                      textValue={this.state.pollOptions[index]}
                      setText={(newValue) => {
                        let newPollOptions = Object.assign(
                          [],
                          this.state.pollOptions
                        );
                        newPollOptions[index] = newValue;
                        this.setState({ pollOptions: newPollOptions });
                      }}
                      placeholder={'Poll option...'}
                    />
                  </View>
                );
              })}

              <Button
                mode={'contained'}
                color={'white'}
                style={styles.newPollOptionButton}
                onPress={() => {
                  this.setState({
                    pollOptions: this.state.pollOptions.concat(''),
                  });
                }}
              >
                New Poll Option
              </Button>
            </>
          )}

          {/* Render form specific to events */}
          {this.state.selectedPostType === 'Event' && (
            <>
              {/* Start Time */}
              <View style={{ flexDirection: 'row' }}>
                <CreatePageTextInput
                  textValue={this.state.eventStartTime}
                  setText={(newText) => {
                    this.setState({ eventStartTime: newText });
                  }}
                  placeholder={'Start Time...'}
                  style={{ marginRight: 4 }}
                />
                {/* End Time */}
                <CreatePageTextInput
                  textValue={this.state.eventEndTime}
                  setText={(newText) => {
                    this.setState({ eventEndTime: newText });
                  }}
                  placeholder={'End Time...'}
                  style={{ marginLeft: 4 }}
                />
              </View>

              {/* Location/Link */}
              <CreatePageTextInput
                textValue={this.state.eventLocation}
                setText={(newText) => {
                  this.setState({ eventLocation: newText });
                }}
                placeholder={'Location/Link...'}
              />

              {/* Admission Price... */}
              <CreatePageTextInput
                textValue={this.state.eventAdmissionPrice}
                setText={(newText) => {
                  this.setState({ eventAdmissionPrice: newText });
                }}
                placeholder={'Admission Price...'}
                style={{ marginHorizontal: '15%' }}
              />
            </>
          )}
        </View>

        {/* Buttons to insert images and tag users */}
        <View style={styles.imageAndTagButtonsView}>
          <Card style={{ marginHorizontal: 8 }}>
            <IconButton
              icon={'tag'}
              color={'black'}
              mode={'contained'}
              style={styles.imageAndTagButtons}
              size={28}
            />
          </Card>
          <Card style={{ marginHorizontal: 8 }}>
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
            // flex: 1,
            flexDirection: 'row',
            marginHorizontal: '20%',
            justifyContent: 'flex-end',
            marginVertical: 10,
          }}
        >
          <Button
            mode={'contained'}
            color={'#6367B4'}
            style={styles.previewAndShareButtons}
          >
            Preview
          </Button>
          <Button
            mode={'contained'}
            color={'#6367B4'}
            style={styles.previewAndShareButtons}
          >
            Share
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default CommunityContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    flexDirection: 'column',
  },
  postTypeOptionsContainer: {
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    margin: '2%',
  },
  formContainer: {
    marginTop: 10,
    marginHorizontal: '7%',
  },
  profilePhotoView: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  basicTextInput: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
    padding: 3,
    paddingLeft: '5%',
  },
  bodyInput: {
    marginTop: 10,
    textAlignVertical: 'top',
    borderRadius: 10,
    padding: 10,
    paddingLeft: '5%',
  },
  pollOptionInput: {
    marginTop: 10,
    borderRadius: 10,
    padding: 3,
    paddingLeft: '5%',
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
  newPollOptionButton: {
    borderRadius: 10,
    flex: 1,
    marginTop: 10,
    elevation: 2,
  },
});
