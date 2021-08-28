import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import ProfilePhotoView from './ProfilePhotoView';
import { PostsEndpoint } from '../../utils/endpoints';
import CommentBar from './CommentBar';
import ImageCollectionView from './ImageCollectionView';
import moment from 'moment';
import { communities, contentTypes } from '../../utils/choices';
import { sharedItemViewStyles } from '../../stylesheets/views/views.jsx';
import UserViewContext from '../../contexts/UserViewContext';

/**
 * Renders a post.
 * @param {object} item
 * @param {function(object): void} updateItem
 * @return {JSX.Element}
 */
const PostView = ({ item, updateItem }) => {
  const { title, creator, datetime_created, content, community, photos } = item;
  const userView = useContext(UserViewContext);

  return (
    <Card style={sharedItemViewStyles.container}>
      <Card.Content style={sharedItemViewStyles.cardContent}>
        <TouchableOpacity
          style={sharedItemViewStyles.row}
          onPress={() => userView.setUser(creator)}
        >
          <ProfilePhotoView photo={creator.profile_photo} />
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
          <Text style={sharedItemViewStyles.bold}>
            Community: {communities[community]}
          </Text>
        </Paragraph>
        <ImageCollectionView photos={photos} />
        <CommentBar
          item={item}
          updateItem={updateItem}
          contentType={contentTypes.post}
          endpoint={PostsEndpoint}
        />
      </Card.Content>
    </Card>
  );
};

export default PostView;
