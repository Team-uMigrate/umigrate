import React from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import ProfilePhoto from '../../common/ProfilePhoto';
import { Choices } from '../../../utils/endpoints';
import ImageCollection from '../../common/ImageCollection';
import GradientButton from 'react-native-gradient-buttons';
import CommentBar from '../../common/CommentBar/CommentBar';

const EventView = ({
  id,
  creator,
  price_scale,
  title,
  region,
  likes,
  comments,
  content,
  location,
  datetime_created,
  start_datetime,
  end_datetime,
  photos,
  is_interested,
  is_attending,
  attendEvent,
  interestedEvent,
  is_liked,
  sendComment
}) => {
  const { width, height } = Dimensions.get('window');
  const contentType = Choices.contentTypes.event;

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <ProfilePhoto photo={creator.profile_photo} />
          </View>
          <View style={styles.column}>
            <Text style={styles.bold}>{creator.preferred_name}</Text>
            <Text style={styles.date}>
              {datetime_created.substring(0, 'YYYY-MM-DD hr-mm'.length)}
            </Text>
          </View>
        </View>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Price: </Text>
          {Choices.prices[price_scale]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Region: </Text>
          {Choices.regions[region]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Location: </Text>
          {location}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Start: </Text>
          {/* {Moment(start_datetime).format('DD-MM')} */}
          {start_datetime.substring(0, 'YYYY-MM-DD hr-mm'.length)}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>End: </Text>
          {end_datetime
            ? end_datetime.substring(0, 'YYYY-MM-DD HR-MM'.length)
            : 'N/A'}
        </Paragraph>
        <ImageCollection photos={photos} />
        <View style={styles.buttonContainer}>
          <GradientButton
          //  compact={true}
          //  mode={is_attending ? 'contained' : 'outlined'}
          //  title={is_attending ? 'Attending' : 'Attending'}
          //  dark={true}
          //  color="white"
          style={styles.buttonStyleAttend}
          gradientBegin={is_interested? "#483FAB" : null}
           textStyle={styles.bodyText}
           radius={10}
          //  gradientEnd="#FF668B"
           onPressAction={() => {
             attendEvent(id, !is_attending);
           }}>
            {is_attending ? 'Attend?' : 'Attending'}
          </GradientButton>
          {/* <Button
            compact={true}
            style={is_attending ? styles.buttonStyleFade : styles.buttonStyle}
            mode={is_attending ? 'contained' : 'outlined'}
            title={is_attending ? 'Attending' : 'Attending'}
            color="white"
            dark={true}
            onPress={() => {
              attendEvent(id, !is_attending);
            }}
          >
          </Button> */}
           <GradientButton
          //  compact={true}
          //  mode={is_interested ? 'contained' : 'outlined'}
          //  title={is_interested ? 'Uninterest' : 'Interested?'}
          //  color="white"
          //  dark={true}
           style={styles.buttonStyleInterest}
           textStyle={styles.bodyText}
           radius={10}
          gradientBegin={is_interested? "#483FAB" : null}
          //  gradientEnd="#FF668B"
           onPressAction={() => {
             interestedEvent(id, !is_interested);
           }}
          >
            {is_interested ? 'Uninterest' : 'Interested?'}
          </GradientButton>
          {/* <Button
            compact={true}
            style={styles.buttonStyle}
            mode={is_interested ? 'contained' : 'outlined'}
            title={is_interested ? 'Uninterest' : 'Interested?'}
            color="white"
            dark={true}
            onPress={() => {
              interestedEvent(id, !is_interested);
            }}
          >
            {is_interested ? 'Uninterest' : 'Interested?'}
          </Button> */}
        </View>
        <View style={styles.row}>
        <CommentBar
          postId={id}
          likes={likes}
          comments={comments}
          sendComment={sendComment}
          isLiked={is_liked}
          contentType= {contentType}
          >
          </CommentBar>
        </View>
      </Card.Content>
    </Card>
  );
};

export default EventView;

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
    flexDirection: 'row',
  },
  column: {
    flex: 5,
    marginTop: "2%",
    marginBottom: "2.5%",
    marginLeft: "2.5%",
    flexDirection: 'column',
  },
  bold: {
    fontWeight: '500',
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
  buttonStyleAttend: {
    height: 36,
    flex: 1,
    marginLeft: 0,
    marginRight: "4%",
    // paddingRight: "2.5%",
    // marginRight: 0,
    // paddingLeft: 5
    // backgroundColor: "blue"
  },
  buttonStyleInterest: {
    height: 36,
    flex: 1,
    // marginLeft: 0,
    marginRight: 0,
    // paddingLeft: 5
    // backgroundColor: "blue"
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: '3%',
    // backgroundColor: "red"
  },
});
