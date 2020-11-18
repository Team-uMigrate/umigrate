import React from "react";
import { StyleSheet, View, Text, TextInput, ScrollView } from "react-native";
import Header from "../../common/Header";
import PostTypeOptionsButton from "./PostTypeOptionsButton";
import ProfilePhoto from "../../common/ProfilePhoto";
import { ProfileEndpoint } from "../../../utils/endpoints";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, IconButton, Button } from "react-native-paper";

class CommunityContainer extends React.Component {
  state = {
    user: { profile_photo: null },
    selectedPostType: "",
    setSelectedPostType: (newValue) => {
      this.setState({ selectedPostType: newValue });
    },
    title: "",
    body: "",
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
        console.log("error", error);
        console.log("error response", error.response);
      }
    );
  };

  render() {
    return (
      <ScrollView styles={styles.container}>
        <Header title={"New Community Post"} isMessagingPage={true} />
        <View style={styles.postTypeOptionsContainer}>
          {/* TODO investigate laggy button response */}
          <PostTypeOptionsButton
            title={"Post"}
            selectedPostType={this.state.selectedPostType}
            setSelectedPostType={this.state.setSelectedPostType}
          />
          <PostTypeOptionsButton
            title={"Poll"}
            selectedPostType={this.state.selectedPostType}
            setSelectedPostType={this.state.setSelectedPostType}
          />
          <PostTypeOptionsButton
            title={"Event"}
            selectedPostType={this.state.selectedPostType}
            setSelectedPostType={this.state.setSelectedPostType}
          />
        </View>

        <View style={styles.formContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.profilePhotoView}>
              <ProfilePhoto photo={this.state.user.profile_photo} />
            </View>
            <View
              style={{
                flexDirection: "column",
                alignSelf: "flex-start",
                flex: 3,
              }}
            >
              <Text>Posting as</Text>
              <Text style={styles.userNameText}>
                {this.state.user.preferred_name}
              </Text>
            </View>
            <View styles={{ alignSelf: "flex-end" }}>
              <MaterialCommunityIcons name={"account-group"} size={40} />
            </View>
          </View>

          {/* Post title and body input */}
          <TextInput
            autoCapitalize={"sentences"}
            autoCorrect={true}
            style={styles.titleInput}
            value={this.state.text}
            placeholder={"Write a title..."}
            placeholderTextColor={"#484848"}
            onChangeText={(newText) => {
              this.setState({ text: newText });
            }}
            backgroundColor={"#DCDCDC"}
          />

          {/* We have to test this in iOS too, to make sure the text aligns at the top and */}
          {/* that it's bearable to edit with */}
          <TextInput
            autoCapitalize={"sentences"}
            autoCorrect={true}
            multiline={true}
            numberOfLines={7}
            style={styles.bodyInput}
            value={this.state.body}
            placeholder={"What would you like to share..."}
            placeholderTextColor={"#484848"}
            onChangeText={(newText) => {
              this.setState({ body: newText });
            }}
            backgroundColor={"#DCDCDC"}
          />
        </View>

        {/* Buttons to insert images and tag users */}
        <View style={styles.imageAndTagButtonsView}>
          <Card style={{ marginHorizontal: 8 }}>
            <IconButton
              icon={"tag"}
              color={"black"}
              mode={"contained"}
              style={styles.imageAndTagButtons}
              size={28}
            />
          </Card>
          <Card style={{ marginHorizontal: 8 }}>
            <IconButton
              icon={"image-plus"}
              color={"black"}
              mode={"contained"}
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
            flexDirection: "row",
            marginHorizontal: "20%",
            justifyContent: "flex-end",
            marginVertical: 10,
          }}
        >
          <Button
            mode={"contained"}
            color={"#6367B4"}
            style={styles.previewAndShareButtons}
          >
            Preview
          </Button>
          <Button
            mode={"contained"}
            color={"#6367B4"}
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
    backgroundColor: "#eeeeee",
    flexDirection: "column",
  },
  postTypeOptionsContainer: {
    backgroundColor: "#c4c4c4",
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    margin: "2%",
  },
  formContainer: {
    marginTop: 10,
    marginHorizontal: "7%",
  },
  profilePhotoView: {
    flex: 1,
    alignSelf: "flex-start",
  },
  userNameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleInput: {
    marginTop: 10,
    borderRadius: 10,
    padding: 3,
    paddingLeft: "5%",
  },
  bodyInput: {
    marginTop: 10,
    textAlignVertical: "top",
    borderRadius: 10,
    padding: 10,
    paddingLeft: "5%",
  },
  pollOptionInput: {
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    paddingLeft: "5%",
  },
  imageAndTagButtonsView: {
    marginTop: 10,
    alignContent: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  imageAndTagButtons: {
    alignSelf: "center",
    borderRadius: 10,
    margin: 0,
  },
  previewAndShareButtons: {
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
});
