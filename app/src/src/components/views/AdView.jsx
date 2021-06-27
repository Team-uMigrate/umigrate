import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import ProfilePhotoView from './ProfilePhotoView';
import { AdsEndpoint } from '../../utils/endpoints';
import CommentBar from './CommentBar';
import ImageCollectionView from './ImageCollectionView';
import moment from 'moment';
import { contentTypes, communities, adCategories } from '../../utils/choices';
import { sharedItemViewStyles } from '../../stylesheets/views/views.jsx';

/**
 * Renders an ad.
 * @param {object} item
 * @param {function(object): void} updateItem
 * @return {JSX.Element}
 */
const AdView = ({ item, updateItem }) => {
  const {
    title,
    creator,
    datetime_created,
    content,
    price,
    community,
    postal_code,
    category,
    photos,
  } = item;

  return (
    <Card style={sharedItemViewStyles.container}>
      <Card.Content style={sharedItemViewStyles.cardContent}>
        <View style={sharedItemViewStyles.row}>
          <View>
            <ProfilePhotoView photo={creator.profile_photo} />
          </View>
          <View style={sharedItemViewStyles.column}>
            <Text style={sharedItemViewStyles.name}>
              {creator.preferred_name}
            </Text>
            <Text style={sharedItemViewStyles.date}>
              {' '}
              {moment(datetime_created).format('MMMM D, YYYY, h:mm a')}
            </Text>
          </View>
        </View>
        <Title style={sharedItemViewStyles.title}>{title}</Title>
        <Paragraph style={sharedItemViewStyles.bodyText}>{content}</Paragraph>
        <Paragraph style={sharedItemViewStyles.bodyText}>
          <Text style={sharedItemViewStyles.bold}>Price: </Text>${price}
        </Paragraph>
        <Paragraph style={sharedItemViewStyles.bodyText}>
          <Text style={sharedItemViewStyles.bold}>Community: </Text>
          {communities[community]}
        </Paragraph>
        <Paragraph style={sharedItemViewStyles.bodyText}>
          <Text style={sharedItemViewStyles.bold}>Postal Code: </Text>
          {postal_code}
        </Paragraph>
        <Paragraph style={sharedItemViewStyles.bodyText}>
          <Text style={sharedItemViewStyles.bold}>Category: </Text>
          {adCategories[category]}
        </Paragraph>
        <ImageCollectionView photos={photos} />
        <CommentBar
          item={item}
          updateItem={updateItem}
          contentType={contentTypes.ad}
          endpoint={AdsEndpoint}
        />
      </Card.Content>
    </Card>
  );
};

export default AdView;
