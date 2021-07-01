import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import Header from '../../components/views/Header';
import { Card, IconButton, Paragraph } from 'react-native-paper';
import MenuLogout from '../../components/buttons/MenuLogout';
import { routes } from '../../utils/routes';
import { getUserData } from '../../utils/storageAccess';
import ProfilePhotoView from '../../components/views/ProfilePhotoView';

// A screen that allows the user to access menu options
class MenuHomeScreen extends Component {
  state = { user: {} };

  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const userData = await getUserData();
    this.setState({ user: userData });
  };

  componentDidUpdate = async (_prevProps, prevState) => {
    if (prevState !== this.state) {
      const userData = await getUserData();
      this.setState({ user: userData });
    }
  };

  componentWillUnmount() {
    this.setState = (_state, _callback) => {
      return;
    };
  }

  render() {
    return this.state.user ? (
      <View style={styles.container}>
        <Header title="MenuHomeScreen" />
        <View style={styles.backHeading}>
          {this.state.user.background_photo && (
            <Image
              style={styles.backGroundHeading}
              source={{
                uri: this.state.user.background_photo
                  ? this.state.user.background_photo
                  : '//:0',
              }}
            />
          )}
          <View style={styles.profileArea}>
            <TouchableOpacity
              style={styles.profileImg}
              onPress={() => this.props.navigation.navigate(routes.profile)}
            >
              <ProfilePhotoView
                photo={this.state.user.profile_photo}
                size={110}
                styles={styles.pfpShadow}
              />
              <Text style={styles.profileName}>
                {!!this.state.user.preferred_name
                  ? this.state.user.preferred_name
                  : ''}
              </Text>
              <Text style={styles.profileText}>See Your Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rows1}>
          <Card style={styles.tiles}>
            <Card.Content>
              <IconButton
                icon="content-save"
                size={
                  Platform.OS === 'ios' ? 70 : Platform.OS === 'android' && 50
                }
                style={styles.iconPic}
                onPress={() =>
                  this.props.navigation.navigate(routes.savedItems)
                }
              />
              <Paragraph style={styles.text}>Saved Items</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.tiles}>
            <Card.Content>
              <IconButton
                icon="calendar"
                size={
                  Platform.OS === 'ios' ? 70 : Platform.OS === 'android' && 50
                }
                style={styles.iconPic}
                onPress={() => this.props.navigation.navigate(routes.calendar)}
              />
              <Paragraph style={styles.text}>Calendar</Paragraph>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.rows2}>
          <Card style={styles.tiles}>
            <Card.Content>
              <IconButton
                icon="settings"
                size={
                  Platform.OS === 'ios' ? 70 : Platform.OS === 'android' && 50
                }
                style={styles.iconPic}
                onPress={() => this.props.navigation.navigate(routes.settings)}
              />
              <Paragraph style={styles.text}>Settings</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.tiles}>
            <Card.Content>
              <MenuLogout />
              <Paragraph style={styles.textLogout}>Logout</Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>
    ) : (
      <View style={styles.waitContainer}>
        <Text>Please Wait</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
export default MenuHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  backHeading: {
    width: '100%',
    height: '20%',
  },
  backGroundHeading: {
    flex: 2,
    width: '100%',
    height: '20%',
  },
  profileArea: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    // get half of pfp on background and half not
    bottom: '-75%',
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
  profileName: {
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 25 : 22,
    paddingTop: 5,
    textAlign: 'center',
  },
  profileText: {
    fontSize: Platform.OS === 'ios' ? 14 : 10,
    textAlign: 'center',
  },
  rows1: {
    flex: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? '35%' : '24%',
  },
  rows2: {
    flex: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  tiles: {
    backgroundColor: '#ffffff',
    margin: '2%',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
  },
  textLogout: {
    textAlign: 'center',
    color: '#ff0000',
  },
  iconPic: {
    alignSelf: 'center',
    marginBottom: '-15%',
  },
});
