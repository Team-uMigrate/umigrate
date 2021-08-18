import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import ProfilePhotoView from './ProfilePhotoView';
import { PostsEndpoint } from '../../utils/endpoints';
import CommentBar from './CommentBar';
import ImageCollectionView from './ImageCollectionView';
import moment from 'moment';
import { communities, contentTypes } from '../../utils/choices';
import { sharedItemViewStyles } from '../../stylesheets/views/views.jsx';

const SharedItemView = () => {
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
              {' '} //EventView and PostView don’t have
              {moment(datetime_created).format('MMMM D, YYYY, h:mm a')}
            </Text>
          </View>
        </View>
        <Title style={sharedItemViewStyles.title}>{title}</Title>
        <Paragraph style={sharedItemViewStyles.bodyText}>{content}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default SharedItemView;
