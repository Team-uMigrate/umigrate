import React from 'react';
import MenuNavigator from '../../navigators/MenuNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Renders the menu screen.
 * @param {StackNavigationProp} navigation
 * @return {JSX.Element}
 * */
const MenuScreen = ({ navigation }) => {
  return <MenuNavigator />;
};

export default MenuScreen;
