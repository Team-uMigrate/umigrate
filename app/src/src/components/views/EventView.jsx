import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import ProfilePhoto from '../profile/ProfilePhoto';
import { EventsEndpoint, Choices } from '../../utils/endpoints';
import CommentBar from '../CommentBar';
import ImageCollection from '../containers/ImageCollection';
import GradientButton from 'react-native-gradient-buttons';
import moment from 'moment';

const EventView = (event) => {
  const {
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
  } = event;

  const { width, height } = Dimensions.get('window');
  const contentType = Choices.contentTypes['event'];

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.row}>
          <View>
            <ProfilePhoto photo={creator.profile_photo} />
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
          {Choices.prices[price_scale]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Community: </Text>
          {Choices.communities[community]}
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
        <ImageCollection photos={photos} />
        <View style={styles.buttonContainer}>
          <GradientButton
            compact={true}
            style={styles.buttonStyleAttend}
            mode={is_attending ? 'contained' : 'outlined'}
            title={is_attending ? 'Attending' : 'Attending'}
            gradientBegin={is_interested ? null : '#483FAB'}
            textStyle={styles.bodyText}
            radius={10}
            onPressAction={async () => {
              await EventsEndpoint.setAttending(event.id, !event.is_attending);
              event.updateItem({
                ...event,
                is_attending: !event.is_attending,
                attending: event.is_attending
                  ? event.attending - 1
                  : event.attending + 1,
              });
            }}
          >
            {is_attending ? 'Attending' : 'Attend?'}
          </GradientButton>

          <GradientButton
            compact={true}
            style={styles.buttonStyleInterest}
            mode={is_interested ? 'contained' : 'outlined'}
            title={is_interested ? 'Uninterest' : 'Interested?'}
            textStyle={styles.bodyText}
            radius={10}
            gradientBegin={is_interested ? null : '#483FAB'}
            onPressAction={async () => {
              await EventsEndpoint.setInterested(
                event.id,
                !event.is_interested
              );
              event.updateItem({
                ...event,
                is_interested: !event.is_interested,
                interested: event.is_interested
                  ? event.interested - 1
                  : event.interested + 1,
              });
            }}
          >
            {is_interested ? 'Uninterest' : 'Interested?'}
          </GradientButton>
        </View>
        <CommentBar
          item={event}
          contentType={contentType}
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
  },
  buttonStyleInterest: {
    height: 36,
    flex: 1,
    marginRight: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: '3%',
  },
});
