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

export const getAuthToken = () => {
  // return sessionStorage.getItem(AUTH_TOKEN);
};

export const setAuthToken = (token) => {
  Axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  // sessionStorage.setItem(AUTH_TOKEN, token);
};

export const removeAuthToken = () => {
  Axios.defaults.headers.common['Authorization'] = null;
  // sessionStorage.removeItem(AUTH_TOKEN);
};

export const getPushToken = () => {
  // get push notification
};

export const setPushToken = (token) => {
  // set push notification
};

export const removePushToken = () => {
  // remove push notification
};

export const getUserData = () => {
  // return JSON.parse(sessionStorage.getItem(USER_DATA));
};

export const setUserData = (userData) => {
  // sessionStorage.setItem(USER_DATA, JSON.stringify(userData));
};

export const removeUserData = () => {
  // sessionStorage.removeItem(USER_DATA);
};

// Helper functions

const toFormData = (data = {}) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

// Base endpoint class
class BaseEndpoint {
  static endpoint = '';

  static async list(
    page,
    filters = {},
  ) {
    let queryString = '?page=' + page;
    for (let key in filters) {
      queryString += '&' + key + '=' + filters[key];
    }
    return await Axios.get(BASE_URL + this.endpoint + queryString);
  }

  static post(
    data,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    const formData = toFormData(data);

    Axios.post(BASE_URL + this.endpoint, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static get(
    id,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    Axios.get(BASE_URL + this.endpoint + id)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static patch(
    id,
    data,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    const formData = toFormData(data);

    Axios.patch(BASE_URL + this.endpoint + id, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static delete(
    id,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    Axios.delete(BASE_URL + this.endpoint + id)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}

// Base posting endpoint class
class BasePostingEndpoint extends BaseEndpoint {
  static async like(
    id,
    shouldLike
  ) {
    const formData = { id: id, like: shouldLike };
    return await Axios.post(BASE_URL + this.endpoint + 'like', formData)
  }
}

// Endpoints

// General endpoint for all types of comments
export class CommentsEndpoint extends BaseEndpoint {
  static endpoint = '/api/comments/';

  static list(
    contentType,
    objectId, // <- The id of the post/listing/ad/etc that you're looking for the comments of
    page,
    filters = {},
    handleSuccess = () => {},
    handleError = () => {}
  ) {
    filters['object_id'] = objectId;
    filters['content_type'] = contentType;
    let queryString = '?page=' + page;

    for (let key in filters) {
      queryString += '&' + key + '=' + filters[key];
    }

    Axios.get(BASE_URL + this.endpoint + queryString)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError();
      });
  }

  static async like(
    id,
    shouldLike,
  ) {
    const formData = { id: id, like: shouldLike };

    return await Axios.post(BASE_URL + this.endpoint + 'like', formData, {
      headers: { 'content-type': 'application/json' },
    });
  }

  // The only difference between these functions and the post and patch functions of the parent class is that
  // these send json data instead of form-data
  static async post(
    data
  ) {
    return await Axios.post(BASE_URL + this.endpoint, data, {
      headers: { 'content-type': 'application/json' },
    });
  }

  static patch(
    id,
    data,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    Axios.patch(BASE_URL + this.endpoint + id, data, {
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}

export class CommentRepliesEndpoint extends BaseEndpoint {
  static endpoint = '/api/comments/replies/';

  static list(
    page,
    commentId,
    filters = {}, // Add post_id
    handleSuccess = () => {},
    handleFailure = () => {}
  ) {
    let queryString = '?page=' + page + '&comment=' + commentId;

    for (let key in filters) {
      queryString += '&' + key + '=' + filters[key].toString();
    }

    Axios.get(BASE_URL + this.endpoint + queryString)
      .then(handleSuccess)
      .catch(handleFailure);
  }
}

export class AdsEndpoint extends BasePostingEndpoint {
  static endpoint = '/api/ads/';
}

export class EventsEndpoint extends BasePostingEndpoint {
  static endpoint = '/api/events/';

  static async attend(
    id,
    shouldAttend
  ) {
    const formData = { id: id, attending: shouldAttend };
    return await Axios.post(BASE_URL + this.endpoint + 'attending', formData);
  }

  static async interested(
    id,
    shouldInterested
  ) {
    const formData = { id: id, interested: shouldInterested };
    return await Axios.post(BASE_URL + this.endpoint + 'interested', formData);
  }
}

export class ListingsEndpoint extends BasePostingEndpoint {
  static endpoint = '/api/listings/';
}

export class JobsEndpoint extends BaseEndpoint {
  static endpoint = '/api/jobs/';
}

export class RoomsEndpoint extends BaseEndpoint {
  static endpoint = '/api/rooms/';
}

export class MessagesEndpoint {
  static list(
    page,
    filters = {},
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    let queryString = '?page=' + page;
    for (let key in filters) {
      queryString += '&' + key + '=' + filters[key];
    }

    Axios.get(BASE_URL + '/api/rooms/messages/' + queryString)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}

export class PollsEndpoint extends BasePostingEndpoint {
  static endpoint = '/api/polls/';
}

export class PostsEndpoint extends BasePostingEndpoint {
  static endpoint = '/api/posts/';
}

export class AuthEndpoint {
  static login(
    data,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    removeAuthToken();
    removeUserData();

    const formData = toFormData(data);

    Axios.post(BASE_URL + '/api/login/', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })
      .then((response) => {
        setAuthToken(response.data.key);
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static logout(handleSuccess = (response) => {}, handleError = (error) => {}) {
    Axios.post(BASE_URL + '/api/logout/')
      .then((response) => {
        removeAuthToken();
        removeUserData();
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static register(
    data,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    removeAuthToken();
    removeUserData();

    const formData = toFormData(data);

    Axios.post(BASE_URL + '/api/registration/', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}

export class UsersEndpoint {
  static list(
    page,
    filters = {},
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    let queryString = '?page=' + page;
    for (let key in filters) {
      queryString += '&' + key + '=' + filters[key];
    }

    Axios.get(BASE_URL + '/api/users/' + queryString)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static get(
    id,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    Axios.get(BASE_URL + '/api/users/' + id)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}

export class ProfileEndpoint {
  static get(handleSuccess = (response) => {}, handleError = (error) => {}) {
    Axios.get(BASE_URL + '/api/user/')
      .then((response) => {
        setUserData(response.data);
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static patch(
    data,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    const formData = toFormData(data);

    Axios.patch(BASE_URL + '/api/user/', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })
      .then((response) => {
        setUserData(response.data);
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}
