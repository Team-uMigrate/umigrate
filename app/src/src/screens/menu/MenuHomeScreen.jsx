import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getUserData, ProfileEndpoint } from '../../utils/endpoints';
import Header from '../../components/views/Header';
import { Avatar, Card, IconButton, Paragraph } from 'react-native-paper';
import MenuLogout from '../../components/buttons/MenuLogout';
import { routes } from '../../utils/routes';

// A screen that allows the user to access menu options
const MenuHomeScreen = ({ navigation }) => {
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
  }, [user]);

  return user ? (
    <View style={styles.container}>
      <Header title="MenuHomeScreen" />
      <View style={styles.backHeading}>
        <Image
          style={styles.backGroundHeading}
          source={{ uri: user.background_photo }}
        />
        <View style={styles.profileArea}>
          <TouchableOpacity
            style={styles.profileImg}
            onPress={() => navigation.navigate(routes.profile)}
          >
            <Avatar.Image
              size={110}
              style={styles.pfpShadow}
              source={{ uri: user.profile_photo }}
            />
            <Text style={styles.profileName}>{user.preferred_name}</Text>
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
              onPress={() => navigation.navigate(routes.savedItems)}
            />
            <Paragraph style={styles.text}>Saved Items</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.tiles}>
          <Card.Content>
            <IconButton
              icon="calendar"
              size={70}
              style={styles.iconPic}
              onPress={() => navigation.navigate(routes.calendar)}
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
              size={70}
              style={styles.iconPic}
              onPress={() => navigation.navigate(routes.settings)}
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
};

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
