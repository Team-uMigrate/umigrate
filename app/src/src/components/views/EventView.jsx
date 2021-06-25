import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import ProfilePhotoView from './ProfilePhotoView';
import { EventsEndpoint } from '../../utils/endpoints';
import CommentBar from './CommentBar';
import ImageCollectionView from './ImageCollectionView';
import GradientButton from 'react-native-gradient-buttons';
import moment from 'moment';
import { communities, contentTypes, prices } from '../../utils/choices';

const EventView = ({ item, updateItem }) => {
  const {
    id,
    creator,
    price_scale,
    title,
    community,
    content,
    location,
    datetime_created,
    start_datetime,
    end_datetime,
    photos,
    is_interested,
    is_attending,
    attending,
    interested,
  } = item;

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.row}>
          <View>
            <ProfilePhotoView photo={creator.profile_photo} />
          </View>
          <View style={styles.column}>
            <Text style={styles.name}>{creator.preferred_name}</Text>
            <Text style={styles.date}>
              {moment(datetime_created).format('MMMM D, YYYY, h:mm a')}
            </Text>
          </View>
        </View>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Price: </Text>
          {prices[price_scale]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Community: </Text>
          {communities[community]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Location: </Text>
          {location}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Start: </Text>
          {moment(start_datetime).format('MMMM D, YYYY, h:mm a')}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>End: </Text>
          {end_datetime
            ? moment(end_datetime).format('MMMM D, YYYY, h:mm a')
            : 'N/A'}
        </Paragraph>
        <ImageCollectionView photos={photos} />
        <View style={styles.buttonContainer}>
          <GradientButton
            style={styles.buttonStyleAttend}
            gradientBegin={is_attending ? '#ffffff' : '#483FAB'}
            gradientEnd={is_attending ? '#ffffff' : '#5438a6'}
            textStyle={[
              styles.bodyText,
              { color: is_attending ? '#483FAB' : '#ffffff' },
            ]}
            radius={10}
            onPressAction={async () => {
              await EventsEndpoint.setAttending(id, !is_attending);
              updateItem({
                ...item,
                is_attending: !is_attending,
                attending: is_attending ? attending - 1 : attending + 1,
              });
            }}
          >
            Attending
          </GradientButton>
          <GradientButton
            style={styles.buttonStyleInterest}
            radius={10}
            gradientBegin={is_interested ? '#ffffff' : '#483FAB'}
            gradientEnd={is_interested ? '#ffffff' : '#5438a6'}
            textStyle={[
              styles.bodyText,
              { color: is_interested ? '#483FAB' : '#ffffff' },
            ]}
            onPressAction={async () => {
              await EventsEndpoint.setInterested(id, !is_interested);
              updateItem({
                ...item,
                is_interested: !is_interested,
                interested: is_interested ? interested - 1 : interested + 1,
              });
            }}
          >
            Interested
          </GradientButton>
        </View>
        <CommentBar
          item={item}
          updateItem={updateItem}
          contentType={contentTypes.event}
          endpoint={EventsEndpoint}
        />
      </Card.Content>
    </Card>
  );
};

export default EventView;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: '2.5%',
    padding: 3,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  cardContent: {
    paddingTop: '1.5%',
    paddingBottom: '2.5%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: '2.5%',
  },
  column: {
    flex: 5,
    marginLeft: '4%',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  bold: {
    fontWeight: '500',
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
  },
  date: {
    color: 'grey',
  },
  title: {
    alignSelf: 'flex-start',
    letterSpacing: 0.5,
  },
  bodyText: {
    marginBottom: 0,
    letterSpacing: 0.5,
    fontSize: 16,
  },
  buttonStyleAttend: {
    height: 36,
    flex: 1,
    marginLeft: 0,
    marginRight: '4%',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#483FAB',
  },
  buttonStyleInterest: {
    height: 36,
    flex: 1,
    marginRight: 0,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#483FAB',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: '3%',
  },
});
