import React from 'react';
import { Avatar } from 'react-native-paper';

const ProfilePhotoView = ({ photo, size = 45 }) => {
  if (photo === null) {
    return <Avatar.Icon size={size} icon={'account'} />;
  } else {
    return <Avatar.Image size={size} source={{ uri: photo }} />;
  }
};

export default ProfilePhotoView;
