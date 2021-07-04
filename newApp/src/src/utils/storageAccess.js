import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

// Async Storage keys
const AUTH_TOKEN = 'AUTH_TOKEN';
const EXPO_TOKEN = 'EXPO_TOKEN';
const USER_DATA = 'USER_DATA';

/**
 * Gets the authentication token from async storage.
 * @return {Promise<string>}
 * */
export async function getAuthToken() {
  return await AsyncStorage.getItem(AUTH_TOKEN);
}

/**
 * Sets the authentication token in async storage.
 * @param {string} token
 * @return {Promise<void>}
 * */
export async function setAuthToken(token) {
  Axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  await AsyncStorage.setItem(AUTH_TOKEN, token);
}

/**
 * Removes the authentication token from async storage.
 * @return {Promise<void>}
 * */
export async function removeAuthToken() {
  Axios.defaults.headers.common['Authorization'] = null;
  await AsyncStorage.removeItem(AUTH_TOKEN);
}

/**
 * Gets the expo push token from async storage.
 * @return {Promise<string>}
 * */
export async function getPushToken() {
  return await AsyncStorage.getItem(EXPO_TOKEN);
}

/**
 * Sets the expo push token in async storage.
 * @param {string} token
 * @return {Promise<void>}
 * */
export async function setPushToken(token) {
  await AsyncStorage.setItem(EXPO_TOKEN, token);
}

/**
 * Removes the expo push token from async storage.
 * @return {Promise<void>}
 * */
export async function removePushToken() {
  await AsyncStorage.removeItem(EXPO_TOKEN);
}

/**
 * Gets user data token from async storage.
 * @return {Promise<object>}
 * */
export async function getUserData() {
  const userData = await AsyncStorage.getItem(USER_DATA);
  return JSON.parse(userData);
}

/**
 * Sets user data in async storage.
 * @param {object} userData
 * @return {Promise<void>}
 * */
export async function setUserData(userData) {
  const userDataStr = JSON.stringify(userData);
  await AsyncStorage.setItem(USER_DATA, userDataStr);
}

/**
 * Removes user data from async storage.
 * @return {Promise<void>}
 * */
export async function removeUserData() {
  await AsyncStorage.removeItem(USER_DATA);
}
