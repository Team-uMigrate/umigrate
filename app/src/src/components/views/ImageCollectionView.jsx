import React from 'react';
import Swiper from 'react-native-swiper';
import { Image } from 'react-native';

const ImageCollectionView = ({ photos }) => {
  if (photos.length > 0) {
    return (
      <Swiper height={400} showsPagination={false} loop={false}>
        {photos
          .filter((photo) => photo.image !== null)
          .map((photo, i) => {
            return (
              <Image
                key={i.toString()}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{ uri: photo.image }}
              />
            );
          })}
      </Swiper>
    );
  }

  return <></>;
};

export default ImageCollectionView;
