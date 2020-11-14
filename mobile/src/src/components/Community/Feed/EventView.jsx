import React from 'react';
import {
  StyleSheet, Dimensions, Image, View, Text,
} from 'react-native';
import {
  Card, Title, Paragraph, Button,
} from 'react-native-paper';
import ProfilePhoto from '../../common/ProfilePhoto';
import { Choices } from '../../../utils/endpoints';
import ImageCollection from '../../common/ImageCollection';

const EventView = ({
  id,
  creator,
  price_scale,
  title,
  region,
  likes,
  comments,
  content,
  location,
  datetime_created,
  start_datetime,
  end_datetime,
  photos,
  is_interested,
  is_attending,
  attendEvent,
  interestedEvent,
}) => {
  const { width, height } = Dimensions.get('window');

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <ProfilePhoto photo={creator.profile_photo} />
          </View>
          <View style={styles.column}>
            <Text>{creator.preferred_name}</Text>
            <Text style={styles.date}>
              {datetime_created.substring(0, 'YYYY-MM-DD'.length)}
            </Text>
          </View>
        </View>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Price Scale: </Text>
          {Choices.prices[price_scale]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Region: </Text>
          {Choices.regions[region]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Location: </Text>
          {location}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Start Time: </Text>
          {start_datetime.substring(0, 'YYYY-MM-DD'.length)}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>End Time: </Text>
          {end_datetime
            ? end_datetime.substring(0, 'YYYY-MM-DD'.length)
            : 'N/A'}
        </Paragraph>
        <ImageCollection photos={photos} />
        <View style={styles.buttonContainer}>
          <Button
            compact
            style={is_attending ? styles.buttonStyleFade : styles.buttonStyle}
            mode={is_attending ? 'contained' : 'outlined'}
            title={is_attending ? 'Unattend' : 'Attend'}
            color="white"
            dark
            onPress={() => {
              attendEvent(id, !is_attending);
            }}
          >
            {is_attending ? 'Unattend' : 'Attend?'}
          </Button>
          <Button
            compact
            style={is_interested ? styles.buttonStyleFade : styles.buttonStyle}
            mode={is_interested ? 'contained' : 'outlined'}
            title={is_interested ? 'Uninterest' : 'Interested?'}
            color="white"
            dark
            onPress={() => {
              interestedEvent(id, !is_interested);
            }}
          >
            {is_interested ? 'Uninterest' : 'Interested?'}
          </Button>
        </View>
        <View style={styles.row}>
          <Paragraph style={styles.likesComments}>
            {`Likes: ${likes}`}
          </Paragraph>
          <Paragraph style={styles.likesComments}>
            {`Comments: ${comments}`}
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

export default EventView;

const styles = StyleSheet.create({
  container: {
    marginTop: '2.5%',
    padding: 5,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 5,
    flexDirection: 'column',
  },
  bold: {
    fontWeight: 'bold',
  },
  date: {
    color: 'grey',
  },
  likesComments: {
    flex: 1,
    paddingTop: 15,
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'flex-start',
  },
  bodyText: {
    marginBottom: 0,
  },
  buttonStyle: {
    height: 36,
    width: 120,
    flex: 1,
    backgroundColor: 'steelblue',
  },
  buttonStyleFade: {
    height: 36,
    width: 120,
    flex: 1,
    backgroundColor: 'rgba(70,130,180,0.5)',
  },
  buttonContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginTop: '3%',
  },
});
