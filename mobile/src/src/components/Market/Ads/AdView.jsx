import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import ProfilePhoto from '../../common/ProfilePhoto';
import { AdsEndpoint, Choices } from '../../../utils/endpoints';
import CommentBar from '../../common/CommentBar/CommentBar';
import ImageCollection from '../../common/ImageCollection';
import moment from 'moment';

const AdView = (ad) => {
  const {
    title,
    creator,
    datetime_created,
    content,
    price,
    region,
    postal_code,
    category,
    photos,
  } = ad;

  const { width, height } = Dimensions.get('window');
  const contentType = Choices.contentTypes['ad'];

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
              {' '}
              {moment(datetime_created).format('MMMM D, YYYY, h:mm a')}
            </Text>
          </View>
        </View>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Price: </Text>${price}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Region: </Text>
          {Choices.regions[region]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Postal Code: </Text>
          {postal_code}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Category: </Text>
          {Choices.adCategories[category]}
        </Paragraph>
        <ImageCollection photos={photos} />
        <CommentBar
          item={ad}
          contentType={contentType}
          endpoint={AdsEndpoint}
        />
      </Card.Content>
    </Card>
  );
};

export default AdView;

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
  title: {
    alignSelf: 'flex-start',
    letterSpacing: 0.5,
  },
  bodyText: {
    marginBottom: 0,
    letterSpacing: 0.5,
    fontSize: 15,
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  date: {
    color: 'grey',
  },
});
