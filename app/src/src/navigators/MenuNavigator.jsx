import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/menu/SettingsScreen';

import SavedHomeScreen from '../screens/saved/SavedHomeScreen';
import PostsScreen from '../screens/saved/PostsScreen';
import EventsScreen from '../screens/saved/EventsScreen';
import AdsScreen from '../screens/saved/AdsScreen';
import ListingsScreen from '../screens/saved/ListingsScreen';

import ProfileScreen from '../screens/menu/ProfileScreen';
import EditProfileScreen from '../screens/menu/EditProfileScreen';
import MenuHomeScreen from '../screens/menu/MenuHomeScreen';
import CalendarScreen from '../screens/menu/CalendarScreen';
import { routes } from '../utils/routes';

const Stack = createStackNavigator();

/**
 * Renders screens based on the current menu navigation route.
 * @return {JSX.Element}
 */
const MenuNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.menuHome} component={MenuHomeScreen} />
      <Stack.Screen name={routes.profile} component={ProfileScreen} />
      <Stack.Screen name={routes.editProfile} component={EditProfileScreen} />
      <Stack.Screen name={routes.savedHome} component={SavedHomeScreen} />
      <Stack.Screen name={routes.posts} component={PostsScreen} />
      <Stack.Screen name={routes.events} component={EventsScreen} />
      <Stack.Screen name={routes.ads} component={AdsScreen} />
      <Stack.Screen name={routes.listings} component={ListingsScreen} />
      <Stack.Screen name={routes.calendar} component={CalendarScreen} />
      <Stack.Screen name={routes.settings} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default MenuNavigator;
