import React, { useEffect, useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import CommunityPage from '../components/Community';
import MarketPage from '../components/Market';
import HousingPage from '../components/Housing';
import MenuNavigator from './MenuNavigator';
import NavContext from '../contexts/NavContext';
import ModalContext from '../contexts/ModalContext';
import CreatePage from '../components/Create';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const nav = useContext(NavContext);
  const modal = useContext(ModalContext);

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
        component={CommunityPage}
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
        component={MarketPage}
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
        component={CreatePage}
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
            modal.setVisible(true);
            e.preventDefault();
          },
        })}
      />
      <Tab.Screen
        name="Housing"
        component={HousingPage}
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
