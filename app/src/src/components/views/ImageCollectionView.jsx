import React from 'react';
import GallerySwiper from 'react-native-gallery-swiper';

const ImageCollectionView = ({ photos }) => {
  const images = photos.map((photo) => {
    return { uri: photo.image };
  });

  return (
    // <GallerySwiper
    //   images={images}
    //   height={images.length > 1 ? 400 : 0}
    //   style={{
    //     flex: 1,
    //     backgroundColor: 'white',
    //   }}
    //   pageMargin={10}
    //   enableTranslate={false}
    // />
    <></>
  );
};

export default ImageCollectionView;
