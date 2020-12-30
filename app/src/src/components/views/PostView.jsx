import React, { createRef } from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import ProfilePhoto from '../common/ProfilePhoto';
import { Choices, PostsEndpoint } from '../../utils/endpoints';
import CommentBar from '../common/CommentBar/CommentBar';
import ImageCollection from '../common/ImageCollection';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';

const PostView = (post) => {
  const { title, creator, datetime_created, content, community, photos } = post;

  const { width, height } = Dimensions.get('window');
  const contentType = Choices.contentTypes['post'];

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
              {moment(datetime_created).format('MMMM D, YYYY, h:mm a')}
            </Text>
          </View>
        </View>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>
            Community: {Choices.communities[community]}
          </Text>
        </Paragraph>
        <ImageCollection photos={photos} />
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
