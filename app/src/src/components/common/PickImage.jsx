import * as ImagePicker from 'expo-image-picker';

// Select an image from the camera roll and change the image
// TODO: can get and change the image on edit profile view, but it doesn't actually save the image when you press save

const pickImage = async ({ set }) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    const imagePath = result.uri;
    const imageExt = result.uri.split('.').pop();
    const imageMime = `image/${imageExt}`;
    const filename = result.uri.split('/').pop();

    const picture = await fetch(imagePath);
    const blobPicture = await picture.blob();

    const imageData = new File([blobPicture], filename);

    const formData = new FormData();
    formData.append(filename, blobPicture);

    const reader = new FileReader();
    reader.readAsDataURL(blobPicture);
    reader.onloadend = () => {
      set(reader.result);
      // save using formData or imageData or something else...
    };
  }
};

export default pickImage;
