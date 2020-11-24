import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { IconButton } from 'react-native-paper';
import { CommentsEndpoint } from '../../../utils/endpoints';

const CommentBarButtons = ({
  item,
  endpoint,
  contentType,
  sendButtonVisible,
  setSendButtonVisible,
  text,
  setText,
}) => {
  const windowWidth = Dimensions.get('window').width;

  if (sendButtonVisible) {
    return (
      // Button to submit comments
      <View style={styles.sendButtonView}>
        <IconButton
          icon={'send'}
          style={styles.sendButton}
          color={'#FF668B'}
          size={35}
          onPress={async () => {
            if (text !== '') {
              // TODO add location and ability to tag users
              let data = {
                content: text,
                object_id: item.id,
                content_type: contentType,
                region: item.region,
                tagged_users: [],
              };
              await CommentsEndpoint.post(data);
              item.updateItem({ ...item, comments: item.comments + 1 });
              setText('');
              setSendButtonVisible(false);
            }
          }}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 'auto',
        }}
      >
        {/* Like button */}
        <View style={styles.buttonView}>
          <IconButton
            // TODO: Update design to match figma
            icon={'heart'}
            color={item.is_liked ? 'red' : 'black'}
            style={styles.button}
            onPress={async () => {
              await endpoint.like(item.id, !item.is_liked);
              item.updateItem({
                ...item,
                is_liked: !item.is_liked,
                likes: item.is_liked ? item.is_liked - 1 : item.is_liked + 1,
              });
            }}
          />
        </View>
        {/* Button to view comments */}
        <View>
          <IconButton
            icon={'comment'}
            color={'black'}
            style={styles.button}
            onPress={() => {
              setSendButtonVisible(true);
            }}
          />
        </View>
      </View>
    );
  }
};

export default CommentBarButtons;

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  sendButtonView: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
    marginLeft: 20,
  },
  button: {
    height: 25,
  },
  sendButton: {
    alignSelf: 'center',
    height: 30,
  },
});
