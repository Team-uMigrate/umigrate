import Axios from 'axios';

// Base URL
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://dev.umigrate.ca'
    : 'https://dev.umigrate.ca'; // Todo: Change this to prod server

// Websocket URLs
export const MESSAGING_WEBSOCKET =
  process.env.NODE_ENV === 'development'
    ? 'wss://dev.umigrate.ca/ws/messaging/'
    : 'wss://dev.umigrate.ca/ws/messaging/'; // Todo: Change this to prod server

export class Choices {
  static pronouns = ['None', 'He/Him', 'She/Her', 'They/Them', 'Other'];
  static seasons = ['Winter', 'Spring', 'Fall'];
  static prices = ['Free', '$', '$$', '$$$', '$$$$', '$$$$$'];
  static regions = ['Waterloo', 'Toronto', 'Brampton', 'Ottawa'];
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
    logEntry: 1,
    permission: 2,
    group: 3,
    contentType: 4,
    session: 5,
    token: 6,
    site: 7,
    emailAddress: 8,
    emailConfiguration: 9,
    socialAccount: 10,
    socialApp: 11,
    socialToken: 12,
    ad: 13,
    event: 14,
    listing: 15,
    job: 16,
    message: 17,
    messagingRoom: 18,
    pollOption: 19,
    poll: 20,
    pollVote: 21,
    post: 22,
    user: 23,
    photo: 24,
    comment: 25,
    reply: 26,
  };
  static adCategories = ['Electronics', 'Books', 'Food', 'Other'];
  static listingCategories = ['Condominium', 'Townhouse', 'Apartment'];
  static notificationLevels = ['All', 'Following', 'None'];
  static currencies = ['CAD', 'USD'];
  static languages = ['English', 'French'];
  static jobTypes = ['Full-time', 'Internship'];
  static roomPrivacy = ['Public', 'Private', 'Direct Messaging'];
}

// Session Storage functions

const AUTH_TOKEN = 'AUTH_TOKEN';
const USER_DATA = 'USER_DATA';

export function getAuthToken() {
  // return sessionStorage.getItem(AUTH_TOKEN);
}

export function setAuthToken(token) {
  Axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  // sessionStorage.setItem(AUTH_TOKEN, token);
}

export function removeAuthToken() {
  Axios.defaults.headers.common['Authorization'] = null;
  // sessionStorage.removeItem(AUTH_TOKEN);
}

export function getPushToken() {
  // get push notification
}

export function setPushToken(token) {
  // set push notification
}

export function removePushToken() {
  // remove push notification
}

export function getUserData() {
  // return JSON.parse(sessionStorage.getItem(USER_DATA));
}

export function setUserData(userData) {
  // sessionStorage.setItem(USER_DATA, JSON.stringify(userData));
}

export function removeUserData() {
  // sessionStorage.removeItem(USER_DATA);
}

// Helper functions

export function toFormData(data = {}) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
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

  static async like(id, shouldLike) {
    return await Axios.post(
      `${BASE_URL}${this.endpoint}like`,
      toFormData({ id: id, like: shouldLike })
    );
  }

  static async async(id, shouldSave) {
    return await Axios.post(
      `${BASE_URL}${this.endpoint}save`,
      toFormData({ id: id, save: shouldSave })
    );
  }
}

// Endpoints

export class AdsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/ads/';
}

export class CommentsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/comments/';

  static async list(contentType, objectId, page, filters = {}) {
    return await AbstractEndpoint.list(page, {
      content_type: contentType,
      object_id: objectId,
      ...filters,
    });
  }
}

export class CommentRepliesEndpoint extends AbstractEndpoint {
  static endpoint = '/api/comments/replies/';

  static async list(commentId, page, filters = {}) {
    return await AbstractEndpoint.list(page, {
      comment: commentId,
      ...filters,
    });
  }
}

export class EventsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/events/';

  static async attend(id, shouldAttend) {
    return await Axios.post(
      `${BASE_URL}${this.endpoint}attending`,
      toFormData({ id: id, attending: shouldAttend })
    );
  }

  static async interested(id, shouldBeInterested) {
    return await Axios.post(
      `${BASE_URL}${this.endpoint}interested`,
      toFormData({ id: id, interested: shouldBeInterested })
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

export class PostsEndpoint extends AbstractEndpoint {
  static endpoint = '/api/posts/';
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
    removeAuthToken();
    removeUserData();
    const response = await Axios.post(
      `${BASE_URL}/api/login/`,
      toFormData({ email: email, password: password }),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
    setAuthToken(response.data.key);

    return response;
  }

  static async logout() {
    const response = await Axios.post(`${BASE_URL}/api/logout/`);
    removeAuthToken();
    removeUserData();

    return response;
  }

  static async register(email, password, confirmPassword) {
    removeAuthToken();
    removeUserData();

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
    setUserData(response.data);

    return response;
  }

  static async patch(data) {
    return await Axios.patch(`${BASE_URL}/api/user/`, toFormData(data), {
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
}
