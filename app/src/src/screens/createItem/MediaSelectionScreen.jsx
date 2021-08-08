import React, { useMemo, useContext } from 'react';
import { AssetsSelector } from 'expo-images-picker';
import { Ionicons } from '@expo/vector-icons';
import { MediaType } from 'expo-media-library';
import SetImagesContext from '../../contexts/SetImagesContext';

// Pass in the setImages callback as a route param
// Docs for the AssetsSelector: https://github.com/natysoz/expo-images-picker
function MediaSelectionScreen({ navigation }) {
  const imageContext = useContext(SetImagesContext);

  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: 'finish',
        back: 'back',
        selected: 'selected',
      },
      midTextColor: 'black',
      maxSelection: 3,
      buttonTextStyle: textStyle,
      buttonStyle: buttonStyle,
      onBack: () => navigation.goBack(),
      onSuccess: (data) => {
        imageContext.setImages(data);
        navigation.goBack();
      },
    }),
    []
  );

  return (
    <AssetsSelector
      Settings={widgetSettings}
      Errors={{
        onError: (error) => {
          console.log('error:', error);
        },
      }}
      Styles={widgetStyles}
      // Resize={widgetResize} // optional
      Navigator={widgetNavigator} // optional
    />
  );
}

export default MediaSelectionScreen;

const textStyle = {
  fontSize: 12,
  color: 'black',
};

const buttonStyle = {
  backgroundColor: 'purple',
};

// Settings objects to pass into the AssetSelector component
const widgetSettings = {
  getImageMetaData: false,
  initialLoad: 100,
  assetsType: [MediaType.photo, MediaType.video],
  minSelection: 1,
  maxSelection: 3,
  portraitCols: 4,
  landscapeCols: 4,
};

const widgetErrors = {
  errorTextColor: 'black',
  errorMessages: {
    hasErrorWithPermissions: 'Error: Insufficient permissions',
    hasErrorWithLoading: 'A loading error has occurred',
    hasErrorWithResizing: 'Error: Resizing failed',
    hasNoAssets: 'Error: No assets found',
  },
};

const widgetStyles = {
  margin: 2,
  bgColor: 'white',
  spinnerColor: 'blue',
  widgetWidth: 99,
  videoIcon: {
    Component: Ionicons,
    iconName: 'ios-videocam',
    color: 'black',
    size: 20,
  },
  selectedIcon: {
    Component: Ionicons,
    iconName: 'ios-checkmark-circle-outline',
    color: 'white',
    bg: 'gray',
    size: 26,
  },
};
