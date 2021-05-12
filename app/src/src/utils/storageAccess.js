import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const AUTH_TOKEN = 'AUTH_TOKEN';
const EXPO_TOKEN = 'EXPO_TOKEN';
const USER_DATA = 'USER_DATA';

export async function getAuthToken() {
  return await AsyncStorage.getItem(AUTH_TOKEN);
}

export async function setAuthToken(token) {
  Axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  await AsyncStorage.setItem(AUTH_TOKEN, token);
}

export async function removeAuthToken() {
  Axios.defaults.headers.common['Authorization'] = null;
  await AsyncStorage.removeItem(AUTH_TOKEN);
}

export async function getPushToken() {
  return await AsyncStorage.getItem(EXPO_TOKEN);
}

export async function setPushToken(token) {
  await AsyncStorage.setItem(EXPO_TOKEN, token);
}

export async function removePushToken() {
  await AsyncStorage.removeItem(EXPO_TOKEN);
}

export async function getUserData() {
  const userData = await AsyncStorage.getItem(USER_DATA);
  return JSON.parse(userData);
}

export async function setUserData(userData = {}) {
  const userDataStr = JSON.stringify(userData);
  await AsyncStorage.setItem(USER_DATA, userDataStr);
}

export async function removeUserData() {
  await AsyncStorage.removeItem(USER_DATA);
}
