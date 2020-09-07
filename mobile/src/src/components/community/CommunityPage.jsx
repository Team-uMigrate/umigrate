import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Header from "../common/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CommunityPage = () => {
  const [showCreate, setShowCreate] = useState(true);

  let data = [];
  for (let i = 0; i < 10; i++) {
    data[i] = {id: i, title: `Item ${i}`};
  }

  const handleScroll = (e) => {
    const velocity = e.nativeEvent.velocity.y;
    if (velocity < -0.5) {
      setShowCreate(true);
    }
    else if (velocity > 0.5) {
      setShowCreate(false);
    }
    console.log(velocity);
  };

  return (
    <View style={styles.container}>
      <Header title="Community"/>
      <FlatList
        data={data}
        renderItem={({item}) =>
          <Text style={styles.title}>{item.title}</Text>
        }
        onScroll={handleScroll}
      />
      {showCreate &&
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="plus-box-outline" color="#888888" size={75}/>
      </TouchableOpacity>
      }
    </View>
  );
};

export default CommunityPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee"
  },
  title: {
    alignSelf: "center",
    marginTop: 80,
    marginBottom: 80
  },
  button: {
    position: 'absolute',
    bottom: "5%",
    right: "5%",
  }
});
