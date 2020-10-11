import React, { useEffect, useContext } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CommunityPage from "../components/Community";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MarketPage from "../components/Market";
import HousingPage from "../components/Housing";
import NotificationPage from "../components/Notifications";
import { StyleSheet } from "react-native";
import NavContext from "../contexts/NavContext";
import MenuNavigator from "./MenuNavigator";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  const nav = useContext(NavContext);
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
        name="Housing"
        component={HousingPage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationPage}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={24} />
          ),
          // Todo: Configure tabBarBadge to show number of notifications
          tabBarBadge: 3,
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
    backgroundColor: "#ffffff",
  },
});
