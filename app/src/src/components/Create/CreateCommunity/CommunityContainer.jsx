import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import Header from '../../Header';
import PostTypeOptionsButton from './PostTypeOptionsButton';
import BasicCreateForm from '../common/BasicCreateForm';
import {
  EventsEndpoint,
  PollOptionsEndpoint,
  PollsEndpoint,
  PostsEndpoint,
  getUserData,
} from '../../../utils/endpoints';
import { Card, IconButton, Button, Portal, Modal } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import CreatePageTextInput from '../common/CreatePageTextInput';
import ButtonWithDownArrow from '../common/ButtonWithDownArrow';

class CommunityContainer extends React.Component {
  state = {
    user: { profile_photo: null },
    selectedPostType: 'Post',
    setSelectedPostType: (newValue) => {
      this.setState({ selectedPostType: newValue });
    },
    community: null,
    title: '',
    body: '',
    pollOptions: [],
    eventTime: new Date(),
    eventLocation: '',
    eventAdmissionPrice: '',
    showDatePicker: false,
    showTimePicker: false,
  };

  resetPage = () => {
    this.setState({
      title: '',
      body: '',
      pollOptions: [],
      eventTime: new Date(),
      eventLocation: '',
      eventAdmissionPrice: '',
      showDatePicker: false,
    });
  };

  componentDidMount = async () => {
    const user = await getUserData();
    this.setState({
      user: user,
      community: user.community,
    });
  };

  submitPost = async () => {
    const basicData = {
      title: this.state.title,
      content: this.state.body,
      community: this.state.user.community,
      tagged_users: [], // TODO add tag user functionality
    };

    if (this.state.selectedPostType === 'Post') {
      // Submit post to post endpoint
      try {
        let response = await PostsEndpoint.post(basicData);
        this.resetPage();
      } catch (error) {
        // TODO: proper error handling - display modal or smth?
        console.log('error message:', error.message);
        console.log('error response:', error.response);
      }
    } else if (this.state.selectedPostType === 'Poll') {
      try {
        const response = await PollsEndpoint.post(basicData);

        for (const i in this.state.pollOptions) {
          let optionData = {
            content: this.state.pollOptions[i],
            creator: this.state.user.id,
            poll: response.data.id,
          };

          await PollOptionsEndpoint.post(optionData);
        }

        this.resetPage();
      } catch (error) {
        // TODO: proper error handling - display modal or smth?
        console.log('error:', error);
        console.log('error response:', error.response);
      }
    } else if (this.state.selectedPostType === 'Event') {
      try {
        const data = {
          ...basicData,
          start_datetime: this.formatDate(this.state.eventTime),
          end_datetime: this.formatDate(this.state.eventTime),
          location: this.state.eventLocation,
          price:
            this.state.eventAdmissionPrice === ''
              ? 0
              : parseInt(this.state.eventAdmissionPrice),
          price_scale: Math.min(
            Math.ceil((this.state.eventAdmissionPrice * 5) / 100),
            5
          ),
        };

        const response = await EventsEndpoint.post(data);
        this.resetPage();
      } catch (error) {
        // TODO: proper error handling - display modal or smth?
        console.log('error:', error);
        console.log('error response:', error.response);
      }
    }
  };

  // Takes in a Date object and returns an EST date string to send to the API
  formatDate = (date) => {
    // For some reason, even if the locale is set to Canada, the date is returned
    // in mm/dd/yy format. This contradicts what you'll find on the MDN docs page :(
    let dateString = date.toLocaleDateString('en-CA', {
      timezone: 'EST',
      year: 'numeric',
    });
    let timeString = date.toLocaleTimeString('en-CA', {
      timezone: 'EST',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    let [month, day, year] = dateString.split('/');
    year = '20' + year;

    let fullDate = year + '-' + month + '-' + day + 'T' + timeString + 'Z';

    return fullDate;
  };

  shareButtonDisabled = () => {
    if (this.state.title === '') return true;
    else if (this.state.selectedPostType === 'Poll') {
      if (this.state.pollOptions.length === 0) return true;
      else
        for (const i in this.state.pollOptions)
          if (this.state.pollOptions[i] === '') return true;
    }
    return false;
  };

  render() {
    return (
      <ScrollView styles={styles.container}>
        <Header title={'New Community Post'} isMessagingOrCommentsPage={true} />
        <View style={styles.postTypeOptionsContainer}>
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
          {/* Elements of the create form that are common to all of the create pages */}
          <BasicCreateForm
            title={this.state.title}
            setTitle={(newTitle) => this.setState({ title: newTitle })}
            body={this.state.body}
            setBody={(newBody) => this.setState({ body: newBody })}
            community={this.state.community}
            setCommunity={(newCommunity) =>
              this.setState({ community: newCommunity })
            }
            profilePhoto={this.state.user.profile_photo}
            pageIconName={'earth'}
          />

          {/* Render list of poll options and new poll option button if the poll button is selected */}
          {this.state.selectedPostType === 'Poll' && (
            <>
              {this.state.pollOptions.map((pollText, index) => {
                return (
                  <View
                    key={index.toString()}
                    style={styles.pollOptionInputView}
                  >
                    <TextInput
                      autoCapitalize={'sentences'}
                      autoCorrect={true}
                      value={this.state.pollOptions[index]}
                      onChangeText={(newValue) => {
                        let newPollOptions = Object.assign(
                          [],
                          this.state.pollOptions
                        );
                        newPollOptions[index] = newValue;
                        this.setState({ pollOptions: newPollOptions });
                      }}
                      placeholder={'Poll option...'}
                      placeholderTextColor={'#484848'}
                      style={{ flex: 5, paddingLeft: '5%' }}
                    />
                    <IconButton
                      icon={'close'}
                      size={16}
                      color={'#404040'}
                      onPress={() => {
                        let newPollOptions = Object.assign(
                          [],
                          this.state.pollOptions
                        );
                        newPollOptions.splice(index, 1); // Removes this poll option
                        this.setState({ pollOptions: newPollOptions });
                      }}
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
              <View style={{ flex: 1, marginTop: 7 }}>
                <ButtonWithDownArrow
                  onPress={() => {
                    this.setState({ showDatePicker: true });
                  }}
                  text={this.state.eventTime.toString()}
                />

                <Portal>
                  <Modal
                    visible={
                      this.state.showDatePicker || this.state.showTimePicker
                    }
                    contentContainerStyle={{ backgroundColor: 'white' }}
                    onDismiss={() => {
                      this.setState({
                        showDatePicker: false,
                        showTimePicker: false,
                      });
                    }}
                  >
                    {/* Date picker */}
                    {this.state.showDatePicker && (
                      <DateTimePicker
                        value={this.state.eventTime}
                        onChange={(event, selectedDate) => {
                          const currentDate =
                            selectedDate || this.state.eventTime;

                          if (Platform.OS !== 'ios') {
                            this.setState({ showDatePicker: false });
                            this.setState({ showTimePicker: true });
                          }
                          this.setState({ eventTime: currentDate });
                        }}
                        mode={'date'}
                        display={'default'}
                        minimumDate={new Date()}
                      />
                    )}

                    {/* Time picker */}
                    {this.state.showTimePicker && (
                      <DateTimePicker
                        value={this.state.eventTime}
                        onChange={(event, selectedDate) => {
                          const newTime = selectedDate || this.state.eventTime;
                          const hours = newTime.getHours();
                          const minutes = newTime.getMinutes();

                          // Clone the date object
                          let currentDate = new Date(
                            this.state.eventTime.getTime()
                          );
                          currentDate.setHours(hours);
                          currentDate.setMinutes(minutes);
                          currentDate.setSeconds(0);

                          this.setState({
                            showTimePicker: Platform.OS === 'ios',
                          });
                          this.setState({
                            eventTime: currentDate,
                          });
                        }}
                        mode={'time'}
                        display={'default'}
                      />
                    )}

                    {/* The DateTimePicker on iOS doesn't include a confirm button, while Android does :( */}
                    {Platform.OS === 'ios' && (
                      <Button
                        onPress={() => {
                          if (this.state.showDatePicker)
                            this.setState({
                              showDatePicker: false,
                              showTimePicker: true,
                            });
                          else if (this.state.showTimePicker)
                            this.setState({ showTimePicker: false });
                        }}
                      >
                        {this.state.showDatePicker ? 'Select time' : 'Confirm'}
                      </Button>
                    )}
                  </Modal>
                </Portal>
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
            color={'#8781D0'}
            style={styles.previewAndShareButtons}
            dark={true}
          >
            Preview
          </Button>
          <Button
            mode={'contained'}
            color={'#8781D0'}
            disabled={this.shareButtonDisabled()}
            style={styles.previewAndShareButtons}
            dark={true}
            onPress={this.submitPost}
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
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  postTypeOptionsContainer: {
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
  pollOptionInputView: {
    flexDirection: 'row',
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    marginTop: 10,
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
