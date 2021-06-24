import Axios, { AxiosResponse } from 'axios';
import {
  removeAuthToken,
  removePushToken,
  removeUserData,
  setAuthToken,
  setUserData,
} from './storageAccess';

// Base URL
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://dev.umigrate.ca'
    : 'https://dev.umigrate.ca'; // todo: change back to prod server

// Websocket URLs
const MESSAGING_WEBSOCKET =
  process.env.NODE_ENV === 'development'
    ? 'wss://dev.umigrate.ca/ws/messaging/'
    : 'wss://dev.umigrate.ca/ws/messaging/'; // todo: change back to prod server

/**
 * Converts an object into a FormData object.
 * @param {object} data
 * @return {FormData}
 * */
function toFormData(data) {
  const formData = new FormData();
  // Append each property to the form data
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

/**
 * Converts an object to query parameters.
 * @param {object} data
 * @return {string}
 * */
function toQueryParams(data) {
  return Object.keys(data)
    .map((key, i) => `${i === 0 ? '?' : '&'}${key}=${data[key]}`)
    .reduce((prev, curr) => prev + curr);
}

/**
 * Represents a base shared item endpoint
 * @property {string} path - the URL path for the endpoint
 * */
class AbstractEndpoint {
  static path = '';

  /**
   * Gets a list of items.
   * @param {number} page
   * @param {object} filters
   * @return {Promise<AxiosResponse>}
   * */
  static async list(page, filters) {
    return await Axios.get(
      `${BASE_URL}${this.path}${toQueryParams({ page: page, ...filters })}`
    );
  }

  /**
   * Creates an item.
   * @param {object} data
   * @return {Promise<AxiosResponse>}
   * */
  static async post(data) {
    return await Axios.post(`${BASE_URL}${this.path}`, toFormData(data), {
      headers: { 'content-type': 'multipart/form-data' },
    });
  }

  /**
   * Gets an item.
   * @param {number} id
   * @return {Promise<AxiosResponse>}
   * */
  static async get(id) {
    return await Axios.get(`${BASE_URL}${this.path}${id}`);
  }

  /**
   * Updates an item.
   * @param {number} id
   * @param {object} data
   * @return {Promise<AxiosResponse>}
   * */
  static async patch(id, data) {
    return await Axios.patch(`${BASE_URL}${this.path}${id}`, toFormData(data), {
      headers: { 'content-type': 'multipart/form-data' },
    });
  }

  /**
   * Deletes an item.
   * @param {number} id
   * @return {Promise<AxiosResponse>}
   * */
  static async delete(id) {
    return await Axios.delete(`${BASE_URL}${this.path}${id}`);
  }

  /**
   * Gets a list of liked items.
   * @param {number} page
   * @return {Promise<AxiosResponse>}
   * */
  static async liked(page) {
    return await Axios.get(
      `${BASE_URL}${this.path}liked${toQueryParams({ page: page })}`
    );
  }

  /**
   * Likes or unlikes an item.
   * @param {number} id
   * @param {boolean} shouldLike
   * @return {Promise<AxiosResponse>}
   * */
  static async like(id, shouldLike) {
    return await Axios.post(
      `${BASE_URL}${this.path}liked`,
      toFormData({ id: id, should_add: shouldLike }),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  }

  /**
   * Gets a list of users that have liked an item.
   * @param {number} id
   * @param {number} page
   * @return {Promise<AxiosResponse>}
   * */
  static async likes(id, page) {
    return await Axios.get(
      `${BASE_URL}${this.path}${id}/likes${toQueryParams({ page: page })}`
    );
  }

  /**
   * Gets a list of saved items.
   * @param {number} page
   * @return {Promise<AxiosResponse>}
   * */
  static async saved(page) {
    return await Axios.get(
      `${BASE_URL}${this.path}saved${toQueryParams({ page: page })}`
    );
  }

  /**
   * Saves or unsaves an item.
   * @param {number} id
   * @param {boolean} shouldSave
   * @return {Promise<AxiosResponse>}
   * */
  static async save(id, shouldSave) {
    return await Axios.post(
      `${BASE_URL}${this.path}saved`,
      toFormData({ id: id, should_add: shouldSave }),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  }
}

// Endpoints

export class AdsEndpoint extends AbstractEndpoint {
  static path = '/api/ads/';
}

export class CommentsEndpoint extends AbstractEndpoint {
  static path = '/api/comments/';
}

export class CommentRepliesEndpoint extends AbstractEndpoint {
  static path = '/api/comments/replies/';
}

export class EventsEndpoint extends AbstractEndpoint {
  static path = '/api/events/';

  /**
   * Gets a list of interested events.
   * @param {number} page
   * @return {Promise<AxiosResponse>}
   * */
  static async interested(page) {
    return await Axios.get(
      `${BASE_URL}${this.path}interested${toQueryParams({ page: page })}`
    );
  }

  /**
   * Sets or unsets the interested status for an event.
   * @param {number} id
   * @param {boolean} shouldSetInterested
   * @return {Promise<AxiosResponse>}
   * */
  static async setInterested(id, shouldSetInterested) {
    return await Axios.post(
      `${BASE_URL}${this.path}interested`,
      toFormData({ id: id, should_add: shouldSetInterested }),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  }

  /**
   * Gets a list of attending events.
   * @param {number} page
   * @return {Promise<AxiosResponse>}
   * */
  static async attending(page) {
    return await Axios.get(
      `${BASE_URL}${this.path}attending${toQueryParams({ page: page })}`
    );
  }
  /**
   * Sets or unsets the attending status for an event.
   * @param {number} id
   * @param {boolean} shouldSetAttending
   * @return {Promise<AxiosResponse>}
   * */
  static async setAttending(id, shouldSetAttending) {
    return await Axios.post(
      `${BASE_URL}${this.path}attending`,
      toFormData({ id: id, should_add: shouldSetAttending }),
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  }
}

export class ListingsEndpoint extends AbstractEndpoint {
  static path = '/api/listings/';
}

export class JobsEndpoint extends AbstractEndpoint {
  static path = '/api/jobs/';
}

export class RoomsEndpoint extends AbstractEndpoint {
  static path = '/api/rooms/';
}

export class MessagesEndpoint {
  static path = '/api/rooms/messages/';

  /**
   * Gets a list of messages.
   * @param {number} page
   * @param {object} filters
   * @return {Promise<AxiosResponse>}
   * */
  static async list(page, filters) {
    return await Axios.get(
      `${BASE_URL}${this.path}${toQueryParams({ page: page, ...filters })}`
    );
  }
}

export class PollsEndpoint extends AbstractEndpoint {
  static path = '/api/polls/';
}

export class PollOptionsEndpoint {
  static path = '/api/polls/options/';

  /**
   * Gets a list of poll options.
   * @param {number} page
   * @param {object} filters
   * @return {Promise<AxiosResponse>}
   * */
  static async list(page, filters = {}) {
    return await Axios.get(
      `${BASE_URL}${this.path}${toQueryParams({ page: page, ...filters })}`
    );
  }

  /**
   * Creates a poll option.
   * @param {object} data
   * @return {Promise<AxiosResponse>}
   * */
  static async post(data) {
    return await Axios.post(`${BASE_URL}${this.path}`, toFormData(data), {
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
}

export class PostsEndpoint extends AbstractEndpoint {
  static path = '/api/posts/';
}

export class DevicesEndpoint {
  static path = '/api/devices/';

  /**
   * Gets a list of devices.
   * @return {Promise<AxiosResponse>}
   * */
  static async list() {
    return await Axios.get(`${BASE_URL}${this.path}`);
  }

  /**
   * Creates a device
   * @param {string} name
   * @param {string} token
   * @return {Promise<AxiosResponse>}
   * */
  static async post(name, token) {
    return await Axios.post(
      `${BASE_URL}${this.path}`,
      {
        name: name,
        expo_push_token: token,
      },
      {
        headers: { 'content-type': 'multipart/form-data' },
      }
    );
  }
}

export class UsersEndpoint {
  static path = '/api/users/';

  /**
   * Gets a list of users.
   * @param {number} page
   * @param {object} filters
   * @return {Promise<AxiosResponse>}
   * */
  static async list(page, filters = {}) {
    return await Axios.get(
      `${BASE_URL}${this.path}${toQueryParams({ page: page, ...filters })}`
    );
  }

  /**
   * Gets a user.
   * @param {number} id
   * @return {Promise<AxiosResponse>}
   * */
  static async get(id) {
    return await Axios.get(`${BASE_URL}${this.path}${id}`);
  }
}

export class AuthEndpoint {
  /**
   * Logs in a user.
   * @param {string} email
   * @param {string} password
   * @return {Promise<AxiosResponse>}
   * */
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

  /**
   * Logs out a user.
   * @return {Promise<AxiosResponse>}
   * */
  static async logout() {
    const response = await Axios.post(`${BASE_URL}/api/logout/`);
    await removeAuthToken();
    await removePushToken();
    await removeUserData();
    return response;
  }

  /**
   * Registers a user.
   * @param {string} email
   * @param {string} password
   * @param {string} confirmPassword
   * @return {Promise<AxiosResponse>}
   * */
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
  /**
   * Gets a user profile.
   * @return {Promise<AxiosResponse>}
   * */
  static async get() {
    const response = await Axios.get(`${BASE_URL}/api/user/`);
    await setUserData(response.data);
    return response;
  }

  /**
   * Updates a user profile.
   * @param {object} data
   * @return {Promise<AxiosResponse>}
   * */
  static async patch(data) {
    return await Axios.patch(`${BASE_URL}/api/user/`, toFormData(data), {
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
}
