import React, { Component, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { Choices, ProfileEndpoint } from "../../../utils/endpoints";
import Header from "../../common/Header";
import ProfileComponents from "./ProfileComponents";

class EditProfile extends Component {
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
    const setPrefName = this.props.setPrefName;
    const setPhone = this.props.setPhone;
    const navigation = this.props.navigation;
    const handleEdit = this.props.handleEdit;
    return (
      <View style={styles.container}>
        <Header title="Edit Profile" />
        <View style={styles.backHeading}>
          <Image
            style={styles.backGroundHeading}
            source={{ uri: this.state.user.background_photo }}
          />
          <View style={styles.profileArea}>
            <TouchableOpacity
              style={styles.profileImg}
              onPress={() => navigation.navigate("Menu")}
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
            <Text style={styles.textLabel}>Preferred name</Text>
            <TextInput
              style={styles.textVal}
              underlineColor="#B8B7B7"
              defaultValue={this.state.user.preferred_name}
              // onChangeText={(text) => setPrefName(text)}
            ></TextInput>
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
            <Text style={styles.textLabel}>Phone</Text>
            <TextInput
              style={styles.textVal}
              underlineColor="#B8B7B7"
              defaultValue={this.state.user.phone_number}
              // onChangeText={(text) => setPhone(text)}
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
        <View style={styles.rowsButtons}>
          <Button
            style={styles.editButtonUndo}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.editButtonTextUndo}>Undo Changes</Text>
          </Button>
          <Button
            style={styles.editButtonSave}
            /* onPress={handleEdit} temporarily commented */
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.editButtonTextSave}>Save Changes</Text>
          </Button>
        </View>
      </View>
    );
  }
}
export default ({ navigation }) => {
  // main issue is with initializing the useState
  const [prefName, setPrefName] = useState(prefName);
  const [phone, setPhone] = useState(phone);
  const change = false;

  const handleEdit = () => {
    ProfileEndpoint.patch(
      { preferred_name: prefName, phone_number: phone },
      (response) => {
        navigation.navigate("Profile");
      },
      (error) => {
        console.log(error);
        console.log(error.response);
      }
    );
  };
  return (
    <EditProfile
      setPrefName={setPrefName}
      navigation={navigation}
      setPhone={setPhone}
      handleEdit={handleEdit}
      change={change}
    />
  );
};

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
  rowsButtons: {
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: "1%",
    width: "100%",
  },
  editButtonSave: {
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#007CFF",
    backgroundColor: "#007CFF",
  },
  editButtonUndo: {
    borderRadius: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#B8B7B7",
  },
  editButtonTextSave: {
    color: "#eeeeee",
    textTransform: "none",
  },
  editButtonTextUndo: {
    color: "#ff0000",
    textTransform: "none",
  },
  textLabel: {
    fontSize: 12,
    textAlign: "left",
    marginLeft: "5%",
    marginBottom: "1%",
    color: "#6C6A6A",
  },
  textVal: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "bold",
    marginLeft: "5%",
    marginBottom: "3%",
    marginRight: "5%",
    height: 20,
  },
});
