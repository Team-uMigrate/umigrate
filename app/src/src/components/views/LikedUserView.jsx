import { Text, View, StyleSheet, Image } from 'react-native';

const LikedUserView = ({ first_name, profile_photo }) => {
  return (
    <>
      <View style={styles.ListBegin}>
        <Text style={styles.text}>{first_name}</Text>
        <Image style={styles.image} source={profile_photo}></Image>
      </View>
    </>
  );
};

export default LikedUserView;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    marginTop: 44,
  },
});
