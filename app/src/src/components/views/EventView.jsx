import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import ProfilePhotoView from './ProfilePhotoView';
import { EventsEndpoint } from '../../utils/endpoints';
import CommentBar from './CommentBar';
import ImageCollectionView from './ImageCollectionView';
import GradientButton from 'react-native-gradient-buttons';
import moment from 'moment';
import { communities, contentTypes, prices } from '../../utils/choices';
import {commonViewStyles} from '../../stylesheets/views/views.jsx';

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
  const contentType = contentTypes['event'];

  return (
    <Card style={commonViewStyles.container}>
      <Card.Content style={commonViewStyles.cardContent}>
        <View style={commonViewStyles.row}>
          <View>
            <ProfilePhotoView photo={creator.profile_photo} />
          </View>
          <View style={commonViewStyles.column}>
            <Text style={commonViewStyles.name}>{creator.preferred_name}</Text>
            <Text style={commonViewStyles.date}>
              {moment(datetime_created).format('MMMM D, YYYY, h:mm a')}
            </Text>
          </View>
        </View>
        <Title style={commonViewStyles.title}>{title}</Title>
        <Paragraph style={commonViewStyles.bodyText}>{content}</Paragraph>
        <Paragraph style={commonViewStyles.bodyText}>
          <Text style={commonViewStyles.bold}>Price: </Text>
          {prices[price_scale]}
        </Paragraph>
        <Paragraph style={commonViewStyles.bodyText}>
          <Text style={commonViewStyles.bold}>Community: </Text>
          {communities[community]}
        </Paragraph>
        <Paragraph style={commonViewStyles.bodyText}>
          <Text style={commonViewStyles.bold}>Location: </Text>
          {location}
        </Paragraph>
        <Paragraph style={commonViewStyles.bodyText}>
          <Text style={commonViewStyles.bold}>Start: </Text>
          {moment(start_datetime).format('MMMM D, YYYY, h:mm a')}
        </Paragraph>
        <Paragraph style={commonViewStyles.bodyText}>
          <Text style={commonViewStyles.bold}>End: </Text>
          {end_datetime
            ? moment(end_datetime).format('MMMM D, YYYY, h:mm a')
            : 'N/A'}
        </Paragraph>
        <ImageCollectionView photos={photos} />
        <View style={styles.buttonContainer}>
          <GradientButton
            compact={true}
            style={styles.buttonStyleAttend}
            mode={is_attending ? 'contained' : 'outlined'}
            title={is_attending ? 'Attending' : 'Attending'}
            gradientBegin={is_interested ? null : '#483FAB'}
            textStyle={commonViewStyles.bodyText}
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
