import React from 'react';
import { Avatar } from 'react-native-paper';

// Both Avatar.Icon and Avatar.Image's style objects accept the same attributes as Views' style objects
const ProfilePhotoView = ({ photo, styles, size = 45 }) => {
  if (photo === null) {
    return <Avatar.Icon size={size} icon={'account'} style={styles} />;
  } else {
    return <Avatar.Image size={size} source={{ uri: photo }} style={styles} />;
  }
};

export default ProfilePhotoView;
