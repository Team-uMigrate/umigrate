import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
import UserViewContext from '../../contexts/UserViewContext';
import { sharedItemViewStyles } from '../../stylesheets/views/views.jsx';

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
  const userView = useContext(UserViewContext);

  return (
    <Card style={sharedItemViewStyles.container}>
      <Card.Content style={sharedItemViewStyles.cardContent}>
        <TouchableOpacity
          style={sharedItemViewStyles.row}
          onPress={() => userView.setUser(creator)}
        >
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
        </TouchableOpacity>
        <Title style={sharedItemViewStyles.title}>{title}</Title>
        <Paragraph style={sharedItemViewStyles.bodyText}>{content}</Paragraph>
        <Paragraph style={sharedItemViewStyles.bodyText}>
          {'Community: ' + communities[community]}
        </Paragraph>
        <Paragraph style={sharedItemViewStyles.bodyText}>
          {'Price: $' + price}
        </Paragraph>
        <Paragraph style={sharedItemViewStyles.bodyText}>
          {'Term: ' + seasons[season] + ' ' + year}
        </Paragraph>
        <Paragraph style={sharedItemViewStyles.bodyText}>
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
