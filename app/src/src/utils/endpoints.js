import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://umigrate.ca' // Todo: Change this to dev server
    : 'https://umigrate.ca';

// Websocket URLs
export const MESSAGING_WEBSOCKET =
  process.env.NODE_ENV === 'development'
    ? 'wss://umigrate.ca/ws/messaging/' // Todo: Change this to dev server
    : 'wss://umigrate.ca/ws/messaging/';

export class Choices {
  static pronouns = ['None', 'He/Him', 'She/Her', 'They/Them', 'Other'];
  static seasons = ['Winter', 'Spring', 'Fall'];
  static prices = ['Free', '$', '$$', '$$$', '$$$$', '$$$$$'];
  static communities = ['Waterloo', 'Toronto', 'Brampton', 'Ottawa'];
  static programs = [
    'Unknown',
    'Engineering',
    'Arts',
    'Mathematics',
    'Science',
    'Applied Health Sciences',
    'Environment',
    'Theology',
    'Graduate Studies',
    'Independent Studies',
    'Interdisciplinary',
    'Conrad Grebel',
    'Renison',
    'St. Pauls',
    'St. Jeromes',
  ];
  static terms = [
    '1A',
    '1B',
    'W1',
    '2A',
    'W2',
    '2B',
    'W3',
    '3A',
    'W4',
    '3B',
    'W5',
    'W6',
    '4A',
    '4B',
  ];
  static contentTypes = {
    ad: 14,
    event: 15,
    listing: 16,
    job: 18,
    messagingRoom: 19,
    message: 20,
    poll: 21,
    pollOption: 22,
    pollVote: 23,
    post: 24,
    user: 25,
    photo: 26,
    comment: 27,
    reply: 28,
  };
  static adCategories = ['Electronics', 'Books', 'Food', 'Other'];
  static listingCategories = ['Condominium', 'Townhouse', 'Apartment'];
  static jobTypes = ['Full-time', 'Internship'];
}

// Session Storage functions

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

// Helper functions

export function toFormData(data = {}) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'object') {
      data[key].forEach((value) => {
        formData.append(key, value);
      });
    } else {
      formData.append(key, data[key]);
    }
  });

  return formData;
}

export function toQueryString(data = {}) {
  return Object.keys(data)
    .map((key, i) => `${i === 0 ? '?' : '&'}${key}=${data[key]}`)
    .reduce((total, current) => total + current);
}

// Abstract endpoint class
class AbstractEndpoint {
  static endpoint = '';

  static async list(page, filters = {}) {
    return await Axios.get(
      `${BASE_URL}${this.endpoint}${toQueryString({ page: page, ...filters })}`
    );
  }

  static async post(data) {
    return await Axios.post(`${BASE_URL}${this.endpoint}`, toFormData(data), {
      headers: { 'content-type': 'multipart/form-data' },
    });
  }

  static async get(id) {
    return await Axios.get(`${BASE_URL}${this.endpoint}${id}`);
  }

  static async patch(id, data) {
    return await Axios.patch(
      `${BASE_URL}${this.endpoint}${id}`,
      toFormData(data),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  }

  static async delete(id) {
    return await Axios.delete(`${BASE_URL}${this.endpoint}${id}`);
  }

  static async liked(page) {
    return await Axios.get(
      `${BASE_URL}${this.endpoint}liked${toQueryString({ page: page })}`
    );
  }

  static async like(id, shouldLike) {
    return await Axios.post(
      `${BASE_URL}${this.endpoint}liked`,
      toFormData({ id: id, should_add: shouldLike }),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  }

  static async likes(id, page) {
    return await Axios.get(
      `${BASE_URL}${this.endpoint}${id}/likes${toQueryString({ page: page })}`
    );
  }

  static async saved(page) {
    return await Axios.get(
      `${BASE_URL}${this.endpoint}saved${toQueryString({ page: page })}`
    );
  }

  static async save(id, shouldSave) {
    return await Axios.post(
      `${BASE_URL}${this.endpoint}saved`,
      toFormData({ id: id, should_add: shouldSave }),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  }
}

// Endpoints

export class AdsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/ads/';
}

export class CommentsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/comments/';
}

export class CommentRepliesEndpoint extends AbstractEndpoint {
  static endpoint = '/api/comments/replies/';
}

export class EventsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/events/';

  static async interested(page) {
    return await Axios.get(
      `${BASE_URL}${this.endpoint}interested${toQueryString({ page: page })}`
    );
  }

  static async setInterested(id, shouldSetInterested) {
    return await Axios.post(
      `${BASE_URL}${this.endpoint}interested`,
      toFormData({ id: id, should_add: shouldSetInterested }),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  }

  static async attending(page) {
    return await Axios.get(
      `${BASE_URL}${this.endpoint}attending${toQueryString({ page: page })}`
    );
  }

  static async setAttending(id, shouldSetAttending) {
    return await Axios.post(
      `${BASE_URL}${this.endpoint}attending`,
      toFormData({ id: id, should_add: shouldSetAttending }),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  }
}

export class ListingsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/listings/';
}

export class JobsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/jobs/';
}

export class RoomsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/rooms/';
}

export class MessagesEndpoint {
  static endpoint = '/api/rooms/messages/';

  static async list(page, filters = {}) {
    return await Axios.get(
      `${BASE_URL}${this.endpoint}${toQueryString({ page: page, ...filters })}`
    );
  }
}

export class PollsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/polls/';
}

export class PollOptionsEndpoint {
  static endpoint = '/api/polls/options/';

  static async list(page, filters = {}) {
    return await Axios.get(
      `${BASE_URL}${this.endpoint}${toQueryString({ page: page, ...filters })}`
    );
  }

  static async post(data) {
    return await Axios.post(`${BASE_URL}${this.endpoint}`, toFormData(data), {
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
}

export class PostsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/posts/';
}

export class DevicesEndpoint {
  static endpoint = '/api/devices/';

  static async list() {
    return await Axios.get(`${BASE_URL}${this.endpoint}`);
  }

  static async post(name, token) {
    return await Axios.post(`${BASE_URL}${this.endpoint}`, {
      name: name,
      expo_push_token: token,
    });
  }
}

export class UsersEndpoint {
  static endpoint = '/api/users/';

  static async list(page, filters = {}) {
    return await Axios.get(
      `${BASE_URL}${this.endpoint}${toQueryString({ page: page, ...filters })}`
    );
  }

  static async get(id) {
    return await Axios.get(`${BASE_URL}${this.endpoint}${id}`);
  }
}

export class AuthEndpoint {
  static async login(email, password) {
    await removeAuthToken();
    await removePushToken();
    await removeUserData();
    const response = await Axios.post(
      `${BASE_URL}/api/login/`,
      toFormData({ email: email, password: password }),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
    await setAuthToken(response.data.key);

    return response;
  }

  static async logout() {
    const response = await Axios.post(`${BASE_URL}/api/logout/`);
    await removeAuthToken();
    await removePushToken();
    await removeUserData();

    return response;
  }

  static async register(email, password, confirmPassword) {
    await removeAuthToken();
    await removePushToken();
    await removeUserData();

    return await Axios.post(
      `${BASE_URL}/api/registration/`,
      toFormData({
        email: email,
        password1: password,
        password2: confirmPassword,
      }),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  }
}

export class ProfileEndpoint {
  static async get() {
    const response = await Axios.get(`${BASE_URL}/api/user/`);
    await setUserData(response.data);

    return response;
  }

  static async patch(data) {
    return await Axios.patch(`${BASE_URL}/api/user/`, toFormData(data), {
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
}
