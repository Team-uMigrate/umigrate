import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
/* Select an image from the camera roll. Returns the local uri to the image. 
   The local uri can also be used on the page without saving it, so if the "undo changes"
   or "back" buttons are pressed, then the image isn't saved (unless you press the "save" button) 
   Quality and compress are both 0 so high quality images can be saved easily.
   */

const pickImage = async ({ set }) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0,
  });

  if (!result.cancelled) {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { width: 1122, height: 1120 } }],
      { compress: 0, format: ImageManipulator.SaveFormat.JPEG }
    );
    set(manipulatedImage.uri);
    return;
  }
};

export default pickImage;
