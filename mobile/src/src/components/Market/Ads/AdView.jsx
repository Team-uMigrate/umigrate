import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import ProfilePhoto from '../../common/ProfilePhoto';
import { AdsEndpoint, Choices } from '../../../utils/endpoints';
import CommentBar from '../../common/CommentBar/CommentBar';
import ImageCollection from '../../common/ImageCollection';

const AdView = (ad) => {
  const {
    title,
    creator,
    datetime_created,
    content,
    price,
    region,
    postal_code,
    category,
    photos,
  } = ad;

  const { width, height } = Dimensions.get('window');
  const contentType = Choices.contentTypes['ad'];

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <ProfilePhoto photo={creator.profile_photo} />
          </View>
          <View style={styles.column}>
            <Text>{creator.preferred_name}</Text>
            <Text style={styles.date}>
              {datetime_created.substring(0, 'YYYY-MM-DD'.length)}
            </Text>
          </View>
        </View>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Price: </Text>${price}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Region: </Text>
          {Choices.regions[region]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Postal Code: </Text>
          {postal_code}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Category: </Text>
          {Choices.adCategories[category]}
        </Paragraph>
        <ImageCollection photos={photos} />
        <CommentBar
          item={ad}
          contentType={contentType}
          endpoint={AdsEndpoint}
        />
      </Card.Content>
    </Card>
  );
};

export default AdView;

const styles = StyleSheet.create({
  container: {
    marginTop: '2.5%',
    padding: 5,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 5,
    flexDirection: 'column',
  },
  bold: {
    fontWeight: 'bold',
  },
  date: {
    color: 'grey',
  },
  likesComments: {
    flex: 1,
    paddingTop: 15,
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'flex-start',
  },
  bodyText: {
    marginBottom: 0,
  },
});
