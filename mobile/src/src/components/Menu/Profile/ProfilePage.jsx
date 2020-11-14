import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { Choices, ProfileEndpoint } from "../../../utils/endpoints";
import Header from "../../common/Header";
import ProfileComponents from "./ProfileComponents";
class ProfilePage extends Component {
  state = { user: {} };

  constructor(props) {
    super(props);
    this.getProfile();
  }

  getProfile = () => {
    ProfileEndpoint.get(
      (response) => {
        this.setState({ user: response.data });
      },
      (error) => {
        console.log(error);
        console.log(error.response);
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header title="Profile" />
        <View style={styles.backHeading}>
          <Image
            style={styles.backGroundHeading}
            source={{ uri: this.state.user.background_photo }}
          />
          <View style={styles.profileArea}>
            <TouchableOpacity
              style={styles.profileImg}
              onPress={() => this.props.navigation.navigate("Menu")}
            >
              <Avatar.Image
                size={100}
                style={styles.pfpShadow}
                source={{ uri: this.state.user.profile_photo }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.pfInfo}>
          <View>
            <ProfileComponents
              label="Preferred name"
              val={this.state.user.preferred_name}
            />
          </View>
          <View style={styles.rows}>
            <ProfileComponents
              label="First name"
              val={this.state.user.first_name}
            />
            <ProfileComponents
              label="Last name"
              val={this.state.user.last_name}
              row={true}
            />
          </View>
          <View>
            <ProfileComponents label="Email" val={this.state.user.email} />
            <ProfileComponents
              label="Phone"
              val={this.state.user.phone_number}
            />
          </View>
          <View style={styles.rows}>
            <ProfileComponents
              label="Pronoun"
              val={Choices.pronouns[this.state.user.pronouns]}
            />
            <ProfileComponents
              label="Birthday"
              val={this.state.user.birthday}
              row={true}
            />
          </View>
          <View>
            <ProfileComponents
              label="Region"
              val={Choices.regions[this.state.user.region]}
            />
            <ProfileComponents
              label="Program"
              val={Choices.programs[this.state.user.enrolled_program]}
            />
            <ProfileComponents
              label="Current Term"
              val={Choices.terms[this.state.user.current_term]}
            />
          </View>
        </View>
        <Button
          style={styles.editButton}
          onPress={() => this.props.navigation.navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Edit profile</Text>
        </Button>
      </View>
    );
  }
}
export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
  backHeading: {
    width: "100%",
    height: "18%",
  },
  backGroundHeading: {
    flex: 2,
    width: "100%",
    height: "18%",
  },
  profileArea: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    // get half of pfp on background and half not
    bottom: "-40%",
    paddingBottom: "-60%",
    width: "100%",
  },
  profileImg: {
    alignSelf: "center",
    justifyContent: "center",
  },
  pfpShadow: {
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
  },
  pfInfo: {
    marginTop: "12%",
  },
  rows: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: "1%",
    marginLeft: "4%",
    width: "100%",
  },
  editButton: {
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#B8B7B7",
  },
  editButtonText: {
    color: "#007CFF",
    textTransform: "none",
  },
});
