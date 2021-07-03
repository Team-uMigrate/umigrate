import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Platform } from 'react-native';
/* Select an image from the camera roll. Returns the local uri to the image. 
   The local uri can also be used on the page without saving it, so if the "undo changes"
    or "back" buttons are pressed, then the image isn't saved (unless you press the "save" button) 
   Quality and compress are both 0 for ios so high quality images can be saved without error (not really noticable
    difference in the lower quality on ios). 
   On android, the quality/compress of the images uploaded don't match the quality/compress on ios, but can 
    be saved with higher quality and compress values (0.5 max - pretty much same quality as ios) without error.
   */

const pickImage = async ({ set }) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: Platform.OS === 'android' ? 0.5 : 0,
  });

  if (!result.cancelled) {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      result.uri,
      [],
      {
        compress: Platform.OS === 'android' ? 0.5 : 0,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );
    set(manipulatedImage.uri);
    return;
  }
};

export default pickImage;
