import React, { useEffect, useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MenuNavigator from './MenuNavigator';
import { StyleSheet } from 'react-native';
import NavContext from '../contexts/NavContext';
import CreateItemContext from '../contexts/CreateItemContext';
import CommunityScreen from "../screens/CommunityScreen";
import MarketScreen from "../screens/MarketScreen";
import CreateItemScreen from "../screens/CreateItemScreen";
import HousingScreen from "../screens/HousingScreen";

const Tab = createMaterialBottomTabNavigator();

// A navigator that renders components depending on the current tab navigation route
const TabNavigator = ({ navigation }) => {
  const nav = useContext(NavContext);
  const createItem = useContext(CreateItemContext);

  useEffect(() => {
    nav.setNavigation(navigation);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Community"
      activeColor="#333333"
      inactiveColor="#888888"
      labeled={false}
      barStyle={styles.TabNavigator}
    >
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="currency-usd"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateItemScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={color}
              size={24}
            />
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            createItem.setIsModalVisible(true);
            e.preventDefault();
          },
        })}
      />
      <Tab.Screen
        name="Housing"
        component={HousingScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="domain" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="menu" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  TabNavigator: {
    backgroundColor: '#ffffff',
  },
});
