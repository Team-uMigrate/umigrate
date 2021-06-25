import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import StackNavContext from '../../contexts/StackNavContext';
import { routes } from '../../utils/routes';

const FeedHeader = ({ feedName }) => {
  const nav = useContext(StackNavContext);

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{feedName}</Text>
      <IconButton
        icon="magnify"
        style={{ alignSelf: 'flex-start' }}
        color={'#AAAAAA'}
        size={25}
        onPress={() => nav.navigation.navigate(routes.search)}
      />
      {/* TODO: Filter Bar */}
    </View>
  );
};

export default FeedHeader;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 0,
    backgroundColor: 'white',
  },
  textStyle: {
    paddingLeft: '5%',
    fontSize: 25,
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
