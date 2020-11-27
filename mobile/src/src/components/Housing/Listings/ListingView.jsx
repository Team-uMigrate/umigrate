import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import ProfilePhoto from '../../common/ProfilePhoto';
import { ListingsEndpoint, Choices } from '../../../utils/endpoints';
import CommentBar from '../../common/CommentBar/CommentBar';
import ImageCollection from '../../common/ImageCollection';

const ListingView = (listing) => {
  const {
    creator,
    title,
    content,
    region,
    datetime_created,
    photos,
    category,
    price,
    season,
    year,
  } = listing;

  const { width, height } = Dimensions.get('window');
  const contentType = Choices.contentTypes['listing'];

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.userInfoContainer}>
          <View style={{ flex: 1 }}>
            <ProfilePhoto photo={creator.profile_photo} />
          </View>
          <View style={{ flex: 5, flexDirection: 'column' }}>
            <Text>{creator.preferred_name}</Text>
            <Text style={{ color: 'grey' }}>
              {datetime_created.substring(0, 'YYYY-MM-DD'.length)}
            </Text>
          </View>
        </View>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          {'Region: ' + Choices.regions[region]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>{'Price: $' + price}</Paragraph>
        <Paragraph style={styles.bodyText}>
          {'Term: ' + Choices.seasons[season] + ' ' + year}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          {'Category: ' + Choices.listingCategories[category]}
        </Paragraph>
        <ImageCollection photos={photos} />
        <CommentBar
          item={listing}
          contentType={contentType}
          endpoint={ListingsEndpoint}
        />
      </Card.Content>
    </Card>
  );
};

export default ListingView;

const styles = StyleSheet.create({
  container: {
    marginTop: '2.5%',
    padding: 5,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  userInfoContainer: {
    flexDirection: 'row',
  },
  title: {
    alignSelf: 'flex-start',
  },
  bodyText: {
    marginBottom: 0,
  },
});
