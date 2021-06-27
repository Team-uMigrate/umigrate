import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Image, Dimensions, Text } from 'react-native';
import Logo from '../../../assets/favicon.png';
import TabNavContext from '../../contexts/TabNavContext';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { routes } from '../../utils/routes';

const statusHeight = getStatusBarHeight(true);
const windowWidth = Dimensions.get('window').width;

const Header = ({
  title,
  isMessagingOrCommentsPage = false,
  isNotificationPage = false,
}) => {
  const nav = useContext(TabNavContext);

  return (
    <Appbar.Header style={styles.header} statusBarHeight={statusHeight}>
      {/* if on messaging page or notification page, let the user go back */}
      {(isNotificationPage || isMessagingOrCommentsPage) && (
        <Appbar.Action
          color="#555555"
          icon={isNotificationPage ? 'arrow-right' : 'arrow-left'}
          style={
            isNotificationPage
              ? {
                  flex: 1,
                  marginLeft: windowWidth - windowWidth * 0.1,
                  float: 'right',
                }
              : { flex: 0 }
          }
          onPress={() => nav.navigation.goBack()}
        />
      )}

      {/* if not on the notification page or messaging page, let the user click notifications */}
      {!isNotificationPage && !isMessagingOrCommentsPage && (
        <Appbar.Action
          color="#555555"
          icon="bell"
          onPress={() => nav.navigation.navigate(routes.notifications)}
        />
      )}

      {/* if not on home page, do not display logo */}
      {!isMessagingOrCommentsPage && !isNotificationPage && (
        <Image style={styles.image} source={Logo} />
      )}

      {/* if on home page, let user go to messages */}
      {!isMessagingOrCommentsPage && !isNotificationPage && (
        <Appbar.Action
          color="#555555"
          icon="message"
          onPress={() => nav.navigation.navigate(routes.messaging)}
        />
      )}
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
  },
  image: {
    height: 40,
    width: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
