import React, { createRef } from 'react';
import {  Dimensions, Image, View, Text } from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import ProfilePhotoView from './ProfilePhotoView';
import { PostsEndpoint } from '../../utils/endpoints';
import CommentBar from './CommentBar';
import ImageCollectionView from './ImageCollectionView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { communities, contentTypes } from '../../utils/choices';
import {commonViewStyles} from '../../stylesheets/views/views.jsx';

const PostView = (post) => {
  const { title, creator, datetime_created, content, community, photos } = post;

  const { width, height } = Dimensions.get('window');
  const contentType = contentTypes['post'];

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
          <Text style={commonViewStyles.bold}>Community: {communities[community]}</Text>
        </Paragraph>
        <ImageCollectionView photos={photos} />
        <CommentBar
          item={post}
          contentType={contentType}
          endpoint={PostsEndpoint}
        />
      </Card.Content>
    </Card>
  );
};

export default PostView;


