import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/menu/SettingsScreen';
import SavedItemsScreen from '../screens/menu/SavedItemsScreen';
import ProfileScreen from '../screens/menu/ProfileScreen';
import EditProfileScreen from '../screens/menu/EditProfileScreen';
import MenuHomeScreen from '../screens/menu/MenuHomeScreen';
import CalendarScreen from '../screens/menu/CalendarScreen';

const Stack = createStackNavigator();

// A navigator that renders components depending on the current menu navigation route
const MenuNavigator = () => {
  return (
    <NavigationContainer
      // Todo: See if this can be removed
      independent={true}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={MenuHomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="SavedItems" component={SavedItemsScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MenuNavigator;
