import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/menu/SettingsScreen';
import SavedItemsScreen from '../screens/menu/SavedItemsScreen';
import ProfileScreen from '../screens/menu/ProfileScreen';
import EditProfileScreen from '../screens/menu/EditProfileScreen';
import MenuHomeScreen from '../screens/menu/MenuHomeScreen';
import CalendarScreen from '../screens/menu/CalendarScreen';
import { routes } from '../utils/routes';

const Stack = createStackNavigator();

// A navigator that renders components depending on the current menu navigation route
const MenuNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.menuHome} component={MenuHomeScreen} />
      <Stack.Screen name={routes.profile} component={ProfileScreen} />
      <Stack.Screen name={routes.editProfile} component={EditProfileScreen} />
      <Stack.Screen name={routes.savedItems} component={SavedItemsScreen} />
      <Stack.Screen name={routes.calendar} component={CalendarScreen} />
      <Stack.Screen name={routes.settings} component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default MenuNavigator;
