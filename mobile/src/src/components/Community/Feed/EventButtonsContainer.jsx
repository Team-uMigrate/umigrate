import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";

const EventButtonsBar = ({
  postId,
  isAttending,
  isInterested,
  attendEvent,
  interestedEvent,
}) => {
  const [attending, setAttending] = useState(isAttending);
  const [interested, setInterested] = useState(isInterested);

  return (
    <View style={styles.buttonContainer}>
      {attending === true ? (
        <Button
          compact={true}
          style={styles.buttonStyleFade}
          mode="contained"
          title="Unattend"
          color="white"
          dark={true}
          onPress={() => {
            attendEvent(postId, !attending);
            setAttending(!attending);
          }}
        >
          Unattend
        </Button>
      ) : (
        <Button
          compact={true}
          style={styles.buttonStyle}
          mode="outlined"
          title="Attending"
          color="white"
          dark={true}
          onPress={() => {
            attendEvent(postId, !attending);
            setAttending(!attending);
          }}
        >
          Attending?
        </Button>
      )}
      {interested == true ? (
        <Button
          compact={true}
          style={styles.buttonStyleFade}
          mode="contained"
          title="uninterest"
          color="white"
          dark={true}
          onPress={() => {
            interestedEvent(postId, !interested);
            setInterested(!interested);
          }}
        >
          Uninterest
        </Button>
      ) : (
        <Button
          compact={true}
          style={styles.buttonStyle}
          mode="outlined"
          title="Interested"
          color="white"
          dark={true}
          onPress={() => {
            interestedEvent(postId, !interested);
            setInterested(!interested);
          }}
        >
          Interested?
        </Button>
      )}
    </View>
  );
};

export default EventButtonsBar;

const styles = StyleSheet.create({
  buttonStyle: {
    height: 36,
    width: 120,
    flex: 1,
    backgroundColor: "steelblue",
  },
  buttonStyleFade: {
    height: 36,
    width: 120,
    flex: 1,
    backgroundColor: "rgba(70,130,180,0.5)",
  },
  buttonContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginTop: "3%",
  },
});
