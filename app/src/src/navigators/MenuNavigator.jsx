import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuPage from '../components/Menu/MenuPage';
import SettingsPage from '../components/Menu/SettingsPage';
import SavedPostsPage from '../components/Menu/SavedPostsPage';
import HousingListingsPage from '../components/Menu/HousingListingsPage';
import ProfilePage from '../components/Menu/Profile/ProfilePage';
import EditProfile from '../components/Menu/Profile/EditProfile';

const Stack = createStackNavigator();

// A navigator that renders components depending on the current menu navigation route
const MenuNavigator = () => {
  return (
    <NavigationContainer
      // Todo: See if this can be removed
      independent={
        true
      }
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={MenuPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Settings" component={SettingsPage} />
        <Stack.Screen name="SavedPosts" component={SavedPostsPage} />
        <Stack.Screen name="HousingListings" component={HousingListingsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MenuNavigator;
