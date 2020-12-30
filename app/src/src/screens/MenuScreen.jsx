import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUserData, ProfileEndpoint } from '../utils/endpoints';
import Header from '../components/common/Header';
import { Avatar, Card, IconButton, Paragraph } from 'react-native-paper';
import MenuLogout from '../components/Menu/MenuLogout';

// A screen that allows the user to access menu options
const MenuScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      if (user === null) {
        const response = await ProfileEndpoint.get();
        setUser(response.data);
      } else {
        const userData = await getUserData();
        setUser(userData);
      }
    })();

    return (
      <View style={styles.container}>
        <Header title="Menu" />
        <View style={styles.backHeading}>
          <Image
            style={styles.backGroundHeading}
            source={{ uri: this.state.user.background_photo }}
          />
          <View style={styles.profileArea}>
            <TouchableOpacity
              style={styles.profileImg}
              onPress={() => this.props.navigation.navigate('Profile')}
            >
              <Avatar.Image
                size={110}
                style={styles.pfpShadow}
                source={{ uri: this.state.user.profile_photo }}
              />
              <Text style={styles.profileName}>
                {this.state.user.preferred_name}
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
                size={70}
                style={styles.iconPic}
                onPress={() => this.props.navigation.navigate('SavedPosts')}
              />
              <Paragraph style={styles.text}>Saved Posts</Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.tiles}>
            <Card.Content>
              <IconButton
                icon="home-city"
                size={70}
                style={styles.iconPic}
                onPress={() =>
                  this.props.navigation.navigate('HousingListings')
                }
              />
              <Paragraph style={styles.text}>Housing Listing</Paragraph>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.rows2}>
          <Card style={styles.tiles}>
            <Card.Content>
              <IconButton
                icon="settings"
                size={70}
                style={styles.iconPic}
                onPress={() => this.props.navigation.navigate('Settings')}
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
    );
  }, [user]);
};

export default MenuScreen;

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
  profileName: {
    fontWeight: 'bold',
    fontSize: 25,
    paddingTop: 5,
    textAlign: 'center',
  },
  profileText: {
    fontSize: 14,
    textAlign: 'center',
  },
  rows1: {
    flex: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '35%',
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
