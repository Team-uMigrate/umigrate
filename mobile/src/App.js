import React from 'react';
import { StyleSheet } from 'react-native';
import CommunityPage from "./src/components/community";
import HousingPage from "./src/components/housing";
import MarketPage from "./src/components/market";
import MenuPage from "./src/components/menu";
import MessagingPage from "./src/components/messaging";
import NotificationPage from "./src/components/notifications";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Community"
        activeColor="#333333"
        inactiveColor="#888888"
        barStyle={styles.TabNavigator}
      >
        <Tab.Screen
          name="Community"
          component={CommunityPage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account-group" color={color} size={24}/>
            )
          }}
        />
        <Tab.Screen
          name="Market"
          component={MarketPage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="currency-usd" color={color} size={24}/>
            )
          }}
        />
        <Tab.Screen
          name="Housing"
          component={HousingPage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={24}/>
            )
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationPage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="bell" color={color} size={24}/>
            ),
            // Todo: Configure tabBarBadge to show number of notifications
            tabBarBadge: 3
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuPage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="menu" color={color} size={24}/>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  TabNavigator: {
    backgroundColor: "#ffffff"
  }
});
