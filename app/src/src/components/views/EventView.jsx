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
import { commonViewStyles } from '../../stylesheets/views/views.jsx';

/**
 * Renders an event.
 * @param {object} item
 * @param {function(object): void} updateItem
 * @return {JSX.Element}
 */
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
