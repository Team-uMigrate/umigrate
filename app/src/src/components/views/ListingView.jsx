import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
import { commonViewStyles } from '../../stylesheets/views/views.jsx';

/**
 * Renders a listing.
 * @param {object} item
 * @param {function(object): void} updateItem
 * @return {JSX.Element}
 */
const ListingView = ({ item, updateItem }) => {
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
              {' '}
              {moment(datetime_created).format('MMMM D, YYYY, h:mm a')}
            </Text>
          </View>
        </View>
        <Title style={commonViewStyles.title}>{title}</Title>
        <Paragraph style={commonViewStyles.bodyText}>{content}</Paragraph>
        <Paragraph style={commonViewStyles.bodyText}>
          {'Community: ' + communities[community]}
        </Paragraph>
        <Paragraph style={commonViewStyles.bodyText}>
          {'Price: $' + price}
        </Paragraph>
        <Paragraph style={commonViewStyles.bodyText}>
          {'Term: ' + seasons[season] + ' ' + year}
        </Paragraph>
        <Paragraph style={commonViewStyles.bodyText}>
          {'Category: ' + listingCategories[category]}
        </Paragraph>
        <ImageCollectionView photos={photos} />
        <CommentBar
          item={item}
          updateItem={updateItem}
          contentType={contentTypes.listing}
          endpoint={ListingsEndpoint}
        />
      </Card.Content>
    </Card>
  );
};

export default ListingView;
