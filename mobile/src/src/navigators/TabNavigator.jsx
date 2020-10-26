import React, { useEffect, useContext } from "react";
import Text from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CommunityPage from "../components/Community";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MarketPage from "../components/Market";
import HousingPage from "../components/Housing";
import MenuPage from "../components/Menu";
import { StyleSheet, View } from "react-native";
import NavContext from "../contexts/NavContext";
import CreatePage from "../components/Create";

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
        component={MenuPage}
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
