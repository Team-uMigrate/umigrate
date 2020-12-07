import React from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import Header from '../../common/Header';
import PostTypeOptionsButton from './PostTypeOptionsButton';
import ProfilePhoto from '../../common/ProfilePhoto';
import BasicCreateForm from '../BasicCreateForm';
import {
  PollOptionsEndpoint,
  PollsEndpoint,
  PostsEndpoint,
  ProfileEndpoint,
} from '../../../utils/endpoints';
import { Card, IconButton, Button } from 'react-native-paper';

import CreatePageTextInput from '../CreatePageTextInput';

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
    eventStartTime: '',
    eventEndTime: '',
    eventLocation: '',
    eventAdmissionPrice: '',
  };

  resetPage = () => {
    this.setState({
      title: '',
      body: '',
      pollOptions: [''],
      eventStartTime: '',
      eventEndTime: '',
      eventLocation: '',
      eventAdmissionPrice: '',
    });
  };

  componentDidMount = async () => {
    await this.getProfile();
    this.setState({ community: this.state.user.community });
  };

  getProfile = async () => {
    await ProfileEndpoint.get()
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((error) => {
        console.log('error:', error);
        console.log('error response:', error.response);
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
        console.log(response.data);
        this.resetPage();
      } catch (error) {
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

          // For performance reasons, I am not awaiting this, so there's a chance that the poll
          // options might arrive in a different order. This doesn't matter at the time of writing this,
          // but in case it happens and you're wondering why, this might be it.
          PollOptionsEndpoint.post(optionData);
        }

        this.resetPage();
      } catch (error) {
        // TODO: proper error handling - display modal or smth?
        console.log('error:', error);
        console.log('error response:', error.response);
      }
    } else if (this.state.selectedPostType === 'Event') {
      //TODO: do events after the dropdowns are finished
    }
  };

  asyncSubmitPoll = async () => {
    let data = {
      title: this.state.title,
      content: this.state.body,
      region: this.state.user.region,
      tagged_users: [], // TODO add tag user functionality
    };

    let pollResponse = await PollsEndpoint.post(data);

    for (let pollOption in this.state.pollOptions) {
    }
  };

  render() {
    return (
      <ScrollView styles={styles.container}>
        <Header title={'New Community Post'} isMessagingOrCommentsPage={true} />
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
            color={'#8781D0'}
            style={styles.previewAndShareButtons}
            dark={true}
          >
            Preview
          </Button>
          <Button
            mode={'contained'}
            color={'#8781D0'}
            disabled={
              this.state.selectedPostType === 'Poll' &&
              JSON.stringify(this.state.pollOptions) === '[]'
            }
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
