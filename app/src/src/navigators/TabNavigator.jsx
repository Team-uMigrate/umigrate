import React, { useEffect, useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import TabNavContext from '../contexts/TabNavContext';
import CreateItemContext from '../contexts/CreateItemContext';
import CommunityScreen from '../screens/tabs/CommunityScreen';
import MarketScreen from '../screens/tabs/MarketScreen';
import CreateItemScreen from '../screens/tabs/CreateItemScreen';
import HousingScreen from '../screens/tabs/HousingScreen';
import MenuScreen from '../screens/tabs/MenuScreen';
import { routes } from '../utils/routes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();

/**
 * Renders screens based on the current tab navigation route.
 * @param {StackNavigationProp} navigation
 * @return {JSX.Element}
 */
const TabNavigator = ({ navigation }) => {
  const nav = useContext(TabNavContext);
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
      lazy={false}
      tabBarOptions={{ showLabel: false, activeTintColor: '#72AAFF' }}
    >
      <Tab.Screen
        name={routes.community}
        component={CommunityScreen}
        initialParams={{ page: routes.community }}
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
        name={routes.market}
        component={MarketScreen}
        initialParams={{ page: routes.market }}
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
        name={routes.createItem}
        component={CreateItemScreen}
        initialParams={{ page: routes.createItem }}
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
        name={routes.housing}
        component={HousingScreen}
        initialParams={{ page: routes.housing }}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="domain" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.menu}
        component={MenuScreen}
        initialParams={{ page: routes.menu }}
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
