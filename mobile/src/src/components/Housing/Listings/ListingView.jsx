import React, { useState } from "react";
import { StyleSheet, Dimensions, Image, View, Text } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import ProfilePhoto from "../../common/ProfilePhoto";
import { Choices } from "../../../utils/endpoints";
import CommentBar from "../../common/CommentBar/CommentBar";

const ListingView = ({
  id,
  creator,
  likes,
  comments,
  title,
  content,
  region,
  datetime_created,
  photo,
  category,
  price,
  season,
  year,
  is_liked,
  likeListing,
  createComment,
}) => {
  const { width, height } = Dimensions.get("window");

  return (
    <Card style={styles.container}>
      <Card.Content>
        <View style={styles.userInfoContainer}>
          <View style={{ flex: 1 }}>
            <ProfilePhoto photo={creator.profile_photo} />
          </View>
          <View style={{ flex: 5, flexDirection: "column" }}>
            <Text>{creator.preferred_name}</Text>
            <Text style={{ color: "grey" }}>
              {datetime_created.substring(0, "YYYY-MM-DD".length)}
            </Text>
          </View>
        </View>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.bodyText}>{content}</Paragraph>
        <Paragraph style={styles.bodyText}>
          {"Region: " + Choices.regions[region]}
        </Paragraph>
        <Paragraph style={styles.bodyText}>{"Price: $" + price}</Paragraph>
        <Paragraph style={styles.bodyText}>
          {"Term: " + Choices.seasons[season] + " " + year}
        </Paragraph>
        <Paragraph style={styles.bodyText}>
          {"Category: " + Choices.listingCategories[category]}
        </Paragraph>
        {photo && (
          <Image
            source={{ uri: photo }}
            style={{ width: 0.88 * width, height: 300 }}
          />
        )}
        <View style={{ flexDirection: "row" }}>
          <Paragraph style={{ flex: 1, alignSelf: "center" }}>
            {"Likes: " + likes}
          </Paragraph>
          <Paragraph style={{ flex: 1, alignSelf: "center" }}>
            {"Comments: " + comments}
          </Paragraph>
        </View>
        <CommentBar
          postId={id}
          likePost={likeListing}
          isLiked={is_liked}
          createComment={createComment}
        />
      </Card.Content>
    </Card>
  );
};

export default ListingView;

const styles = StyleSheet.create({
  container: {
    marginTop: "2.5%",
    padding: 5,
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  userInfoContainer: {
    flexDirection: "row",
  },
  title: {
    alignSelf: "flex-start",
  },
  bodyText: {
    marginBottom: 0,
  },
});
