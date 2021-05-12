import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import ProfilePhotoView from './ProfilePhotoView';
import { ListingsEndpoint } from '../../utils/endpoints';
import CommentBar from './CommentBar';
import ImageCollectionView from './ImageCollectionView';
import moment from 'moment';
import {
  communities,
  contentTypes,
  listingCategories,
  seasons,
} from '../../utils/choices';

const ListingView = (listing) => {
  const {
    creator,
    title,
    content,
    community,
    datetime_created,
    photos,
    category,
    price,
    season,
    year,
  } = listing;

  const { width, height } = Dimensions.get('window');
  const contentType = contentTypes.listing;

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
              {' '}
              {moment(datetime_created).format('MMMM D, YYYY, h:mm a')}
            </Text>
          </View>
        </View>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          {'Community: ' + communities[community]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>{'Price: $' + price}</Paragraph>
        <Paragraph style={styles.bodyText}>
          {'Term: ' + seasons[season] + ' ' + year}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          {'Category: ' + listingCategories[category]}
        </Paragraph>
        <ImageCollectionView photos={photos} />
        <CommentBar
          item={listing}
          contentType={contentType}
          endpoint={ListingsEndpoint}
        />
      </Card.Content>
    </Card>
  );
};

export default ListingView;

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
  date: {
    color: 'grey',
  },
  bodyText: {
    marginBottom: 0,
    letterSpacing: 0.5,
    fontSize: 15,
  },
  bold: {
    fontWeight: '500',
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
  },
});
