import * as ImagePicker from 'expo-image-picker';
/* Select an image from the camera roll. Returns the local uri to the image. 
   The local uri can also be used on the page without saving it, so if the "undo changes"
   or "back" buttons are pressed, then the image isn't saved (unless you press the "save" button) */

const pickImage = async ({ set }) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.cancelled) {
    set(result.uri);
    return;
  }
};

export default pickImage;
