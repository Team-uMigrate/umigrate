import React, { useContext } from 'react';
import { Platform } from 'react-native';
import { IconButton } from 'react-native-paper';
import { AuthEndpoint } from '../../utils/endpoints';
import AuthContext from '../../contexts/AuthContext';

const MenuLogout = () => {
  const auth = useContext(AuthContext);

  const handleSignOut = async () => {
    await AuthEndpoint.logout();
    auth.setIsAuthenticated(false);
  };

  return (
    <IconButton
      icon="logout"
      size={Platform.OS === 'ios' ? 70 : Platform.OS === 'android' && 50}
      style={{ alignSelf: 'center', marginBottom: '-15%' }}
      onPress={handleSignOut}
    />
  );
};

export default MenuLogout;
