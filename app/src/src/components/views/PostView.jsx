import React, { createRef, useContext } from 'react';
import { StyleSheet, Dimensions, Image, View, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import ProfilePhotoView from './ProfilePhotoView';
import { PostsEndpoint } from '../../utils/endpoints';
import CommentBar from './CommentBar';
import ImageCollectionView from './ImageCollectionView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import { communities, contentTypes } from '../../utils/choices';
import UserViewContext from '../../contexts/UserViewContext';

const PostView = (post) => {
  const { title, creator, datetime_created, content, community, photos } = post;

  const { width, height } = Dimensions.get('window');
  const contentType = contentTypes['post'];
  const userView = useContext(UserViewContext);

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.cardContent}>
      <TouchableOpacity style={styles.row}
        onPress = { () => userView.setUser(creator) }>
          <View>
            <ProfilePhotoView photo={creator.profile_photo} />
          </View>
          <View style={styles.column}>
            <Text style={styles.name}>{creator.preferred_name}</Text>
            <Text style={styles.date}>
              {moment(datetime_created).format('MMMM D, YYYY, h:mm a')}
            </Text>
          </View>
        </TouchableOpacity>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Community: {communities[community]}</Text>
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
  bold: {
    fontWeight: '500',
  },
  date: {
    color: 'grey',
  },
  name: {
    fontWeight: '500',
    fontSize: 16,
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
});
