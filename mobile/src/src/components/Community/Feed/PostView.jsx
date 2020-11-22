import React, { createRef } from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import ProfilePhoto from '../../common/ProfilePhoto';
import { Choices } from '../../../utils/endpoints';
import ImageCollection from '../../common/ImageCollection';

const PostView = ({
  title,
  creator,
  datetime_created,
  content,
  region,
  postal_code,
  category,
  photos,
  likes,
  comments,
}) => {
  const { width, height } = Dimensions.get('window');

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
        <View style={styles.row}>
        <Paragraph style={styles.likesComments}>
            {"Likes " + "(" + likes + ")"}
          </Paragraph>
          <Paragraph style={styles.likesComments}>
            {"Comments " + "(" + comments + ")"}
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

export default PostView;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: '2.5%',
    padding: 5,
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
  likesComments: {
    marginRight: "8%",
    paddingTop: "2.5%",
    color: "#484848",
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 0,
    letterSpacing: 0.5,
    marginBottom: 0,
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
