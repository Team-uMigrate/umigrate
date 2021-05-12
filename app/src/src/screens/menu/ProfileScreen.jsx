import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import Header from '../../components/views/Header';
import ProfileView from '../../components/views/ProfileView';
import { routes } from '../../utils/routes';
import { getUserData } from '../../utils/storageAccess';
import { communities, programs, pronouns, terms } from "../../utils/choices";

class ProfileScreen extends Component {
  state = { user: {} };

  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const userData = await getUserData();
    this.setState({ user: userData });
  };

  componentDidUpdate = async (_prevProps, prevState) => {
    if (prevState != this.state) {
      const userData = await getUserData();
      this.setState({ user: userData });
    }
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
              onPress={() => this.props.navigation.navigate(routes.menuHome)}
            >
              <Avatar.Image
                size={100}
                style={styles.pfpShadow}
                source={{ uri: this.state.user.profile_photo }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          style={{ flex: 1, marginHorizontal: 1 }}
          scrollEnabled={Platform.OS == 'android'}
        >
          <View style={styles.pfInfo}>
            <View>
              <ProfileView
                label="Preferred name"
                val={this.state.user.preferred_name}
              />
            </View>
            <View style={styles.rows}>
              <ProfileView
                label="First name"
                val={this.state.user.first_name}
              />
              <ProfileView
                label="Last name"
                val={this.state.user.last_name}
                row={true}
              />
            </View>
            <View>
              <ProfileView label="Email" val={this.state.user.email} />
              <ProfileView label="Phone" val={this.state.user.phone_number} />
            </View>
            <View style={styles.rows}>
              <ProfileView
                label="Pronoun"
                val={pronouns[this.state.user.pronouns]}
              />
              <ProfileView
                label="Birthday"
                val={this.state.user.birthday}
                row={true}
              />
            </View>
            <View>
              <ProfileView
                label="Community"
                val={communities[this.state.user.community]}
              />
              <ProfileView
                label="Program"
                val={programs[this.state.user.enrolled_program]}
              />
              <ProfileView
                label="Current Term"
                val={terms[this.state.user.current_term]}
              />
            </View>
          </View>
          <Button
            style={styles.editButton}
            onPress={() => this.props.navigation.navigate(routes.editProfile)}
          >
            <Text style={styles.editButtonText}>Edit profile</Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  backHeading: {
    width: '100%',
    height: '18%',
  },
  backGroundHeading: {
    flex: 2,
    width: '100%',
    height: '18%',
  },
  profileArea: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    // get half of pfp on background and half not
    bottom: '-40%',
    paddingBottom: '-60%',
    width: '100%',
  },
  profileImg: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pfpShadow: {
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
  },
  pfInfo: {
    marginTop: '12%',
  },
  rows: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: '1%',
    marginLeft: '4%',
    width: '100%',
  },
  editButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#B8B7B7',
  },
  editButtonText: {
    color: '#007CFF',
    textTransform: 'none',
  },
});
