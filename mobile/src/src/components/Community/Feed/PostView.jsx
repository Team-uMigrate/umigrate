import React, { createRef } from "react";
import { StyleSheet, Dimensions, Image, View, Text } from "react-native";
import { Card, Title, Paragraph, Avatar } from "react-native-paper";
import ProfilePhoto from "../../common/ProfilePhoto";
import { Choices } from "../../../utils/endpoints";
import ImageCollection from "../../common/ImageCollection";

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
  const { width, height } = Dimensions.get("window");

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
              {datetime_created.substring(0, "YYYY-MM-DD".length)}
            </Text>
          </View>
        </View>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          <Text style={styles.bold}>Region: {Choices.regions[region]}</Text>
        </Paragraph>
        {photos && <ImageCollection photos={photos} />}
        <View style={styles.row}>
          <Paragraph style={styles.likesComments}>
            {"Likes: " + likes}
          </Paragraph>
          <Paragraph style={styles.likesComments}>
            {"Comments: " + comments}
          </Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

export default PostView;

const styles = StyleSheet.create({
  container: {
    marginTop: "2.5%",
    padding: 5,
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flex: 5,
    flexDirection: "column",
  },
  bold: {
    fontWeight: "bold",
  },
  date: {
    color: "grey",
  },
  likesComments: {
    flex: 1,
    paddingTop: 15,
    alignSelf: "center",
  },
  title: {
    alignSelf: "flex-start",
  },
  bodyText: {
    marginBottom: 0,
  },
});
