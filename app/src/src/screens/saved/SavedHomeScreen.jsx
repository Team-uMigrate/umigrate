import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/views/Header';
import { Card, Paragraph } from 'react-native-paper';
import { routes } from '../../utils/routes';

// A screen that allows user to access saved items category that they want to view
const SavedHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="SavedHomeScreen" />
      <View style={styles.rows1}>
        <Card
          style={styles.tiles}
          onPress={() =>
            navigation.navigate(routes.savedItems, { type: 'posts' })
          }
        >
          <Card.Content>
            <Paragraph style={styles.text}>Saved Posts</Paragraph>
          </Card.Content>
        </Card>
        <Card
          style={styles.tiles}
          onPress={() =>
            navigation.navigate(routes.savedItems, { type: 'events' })
          }
        >
          <Card.Content>
            <Paragraph style={styles.text}>Saved Events</Paragraph>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.rows2}>
        <Card
          style={styles.tiles}
          onPress={() =>
            navigation.navigate(routes.savedItems, { type: 'ads' })
          }
        >
          <Card.Content>
            <Paragraph style={styles.text}>Saved Ads </Paragraph>
          </Card.Content>
        </Card>
        <Card
          style={styles.tiles}
          onPress={() =>
            navigation.navigate(routes.savedItems, { type: 'listings' })
          }
        >
          <Card.Content>
            <Paragraph style={styles.text}>Saved Listings</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default SavedHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  title: {
    textAlign: 'left',
    marginLeft: '11%',
    marginTop: '5%',
    fontSize: 20,
  },
  tiles: {
    backgroundColor: '#ffffff',
    margin: '2%',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  rows1: {
    flex: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '30%',
  },
  rows2: {
    flex: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: '30%',
  },
  text: {
    marginTop: '30%',
    textAlign: 'center',
  },
});
