import React, { createRef } from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import ProfilePhoto from '../../common/ProfilePhoto';
import { Choices, PostsEndpoint } from '../../../utils/endpoints';
import CommentBar from '../../common/CommentBar/CommentBar';
import ImageCollection from '../../common/ImageCollection';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CommentBar from '../../common/CommentBar/CommentBar';

const PostView = (post) => {
  const { title, creator, datetime_created, content, region, photos } = post;

  const { width, height } = Dimensions.get('window');
  const contentType = Choices.contentTypes['post'];

  return (
    <Card style={styles.container} >
      <Card.Content style={styles.cardContent}>
        <View style={styles.row} >
          <View style={{ flex: 1}} >
            <ProfilePhoto photo={creator.profile_photo} />
          </View>
          <View style={styles.column} >
            <Text style={styles.bold}>{creator.preferred_name}</Text>
            <Text style={styles.date} >
              {datetime_created.substring(0, 'YYYY-MM-DD'.length)}
            </Text>
          </View>
        </View>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Region: {Choices.regions[region]}</Text>
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
    display: "flex",
    marginTop: '2.5%',
    padding: 3,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  cardContent: {
    paddingTop: "1.5%",
    paddingBottom: "2.5%"
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flex: 5,
    marginTop: "2%",
    marginBottom: "2.5%",
    marginLeft: "2.5%",
    flexDirection: "column",
  },
  bold: {
    fontWeight: "500",
  },
  date: {
    fontWeight: "300",
  },
  title: {
    alignSelf: 'flex-start',
    letterSpacing: 0.5,
    fontSize: 22,
  },
  bodyText: {
    marginBottom: 0,
    letterSpacing: 0.5,
    fontSize: 16,
  },
});
