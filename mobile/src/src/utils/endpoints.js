import Axios from "axios";

// Base URL
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "https://dev.umigrate.ca"
    : "https://dev.umigrate.ca"; // Todo: Change this to prod server

// Websocket URLs
export const MESSAGING_WEBSOCKET =
  process.env.NODE_ENV === "development"
    ? "wss://dev.umigrate.ca/ws/messaging/"
    : "wss://dev.umigrate.ca/ws/messaging/"; // Todo: Change this to prod server

// Session Storage functions

const AUTH_TOKEN = "AUTH_TOKEN";
const USER_DATA = "USER_DATA";

export const getAuthToken = () => {
  // return sessionStorage.getItem(AUTH_TOKEN);
};

export const setAuthToken = (token) => {
  Axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  // sessionStorage.setItem(AUTH_TOKEN, token);
};

export const removeAuthToken = () => {
  Axios.defaults.headers.common["Authorization"] = null;
  // sessionStorage.removeItem(AUTH_TOKEN);
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
  static endpoint = "";

  static list(
    page,
    filters = {},
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    let queryString = "?page=" + page;
    for (let key in filters) {
      queryString += "&" + key + "=" + filters[key];
    }

    Axios.get(BASE_URL + this.endpoint + queryString)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static post(
    data,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    const formData = toFormData(data);

    Axios.post(BASE_URL + this.endpoint, formData, {
      headers: { "content-type": "multipart/form-data" },
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
      headers: { "content-type": "multipart/form-data" },
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
  static like(
    id,
    shouldLike,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    const formData = { id: id, like: shouldLike };

    Axios.post(BASE_URL + this.endpoint + "like", formData)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}

// Base comment endpoint class
class BaseCommentEndpoint extends BaseEndpoint {
  static like(
    id,
    shouldLike,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    const formData = { id: id, like: shouldLike };

    Axios.post(BASE_URL + this.endpoint + "like", formData, {
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  // The only difference between these functions and the post and patch functions of the parent class is that
  // these send json data instead of form-data
  static post(
    data,
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    Axios.post(BASE_URL + this.endpoint, data, {
      headers: { "content-type": "application/json" },
    })
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
    Axios.patch(BASE_URL + this.endpoint + id, data, {
      headers: { "content-type": "application/json" },
    })
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}

// Endpoints
export class AdsEndpoint extends BasePostingEndpoint {
  static endpoint = "/api/ads/";
}

export class AdCommentsEndpoint extends BaseCommentEndpoint {
  static endpoint = "/api/ads/comments/";
}

export class EventsEndpoint extends BasePostingEndpoint {
  static endpoint = "/api/events/";
}

export class EventCommentsEndpoint extends BaseCommentEndpoint {
  static endpoint = "/api/events/comments/";
}

export class ListingsEndpoint extends BasePostingEndpoint {
  static endpoint = "/api/listings/";
}

export class ListingCommentsEndpoint extends BaseCommentEndpoint {
  static endpoint = "/api/listings/comments/";
}

export class JobsEndpoint extends BaseEndpoint {
  static endpoint = "/api/jobs/";
}

export class RoomsEndpoint extends BaseEndpoint {
  static endpoint = "/api/rooms/";
}

export class MessagesEndpoint {
  static list(
    page,
    filters = {},
    handleSuccess = (response) => {},
    handleError = (error) => {}
  ) {
    let queryString = "?page=" + page;
    for (let key in filters) {
      queryString += "&" + key + "=" + filters[key];
    }

    Axios.get(BASE_URL + "/api/rooms/messages/" + queryString)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}

export class PollsEndpoint extends BasePostingEndpoint {
  static endpoint = "/api/polls/";
}

export class PollCommentsEndpoint extends BaseCommentEndpoint {
  static endpoint = "/api/polls/comments/";
}

export class PostsEndpoint extends BasePostingEndpoint {
  static endpoint = "/api/posts/";
}

export class PostCommentsEndpoint extends BaseCommentEndpoint {
  static endpoint = "/api/posts/comments/";
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

    Axios.post(BASE_URL + "/auth/login/", formData, {
      headers: { "content-type": "multipart/form-data" },
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
    Axios.post(BASE_URL + "/auth/logout/")
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

    Axios.post(BASE_URL + "/auth/registration/", formData, {
      headers: { "content-type": "multipart/form-data" },
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
    let queryString = "?page=" + page;
    for (let key in filters) {
      queryString += "&" + key + "=" + filters[key];
    }

    Axios.get(BASE_URL + "/api/users/" + queryString)
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
    Axios.get(BASE_URL + "/api/users/" + id)
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
    Axios.get(BASE_URL + "/auth/user/")
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

    Axios.patch(BASE_URL + "/auth/user/", formData, {
      headers: { "content-type": "multipart/form-data" },
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

export class Choices {
  static pronouns = ["None", "He/Him", "She/Her", "They/Them", "Other"];
  static seasons = ["Winter", "Spring", "Fall"];
  static prices = ["Free", "$", "$$", "$$$", "$$$$", "$$$$$"];
  static regions = ["Waterloo", "Toronto", "Brampton", "Ottawa"];
  static programs = [
    "Unknown",
    "Engineering",
    "Arts",
    "Mathematics",
    "Science",
    "Applied Health Sciences",
    "Environment",
    "Theology",
    "Graduate Studies",
    "Independent Studies",
    "Interdisciplinary",
    "Conrad Grebel",
    "Renison",
    "St. Pauls",
    "St. Jeromes",
  ];
  static terms = [
    "1A",
    "1B",
    "W1",
    "2A",
    "W2",
    "2B",
    "W3",
    "3A",
    "W4",
    "3B",
    "W5",
    "W6",
    "4A",
    "4B",
  ];
  static adCategories = ["Electronics", "Books", "Food", "Other"];
  static listingCategories = ["Condominium", "Townhouse", "Apartment"];
  static notificationLevels = ["All", "Following", "None"];
  static currencies = ["CAD", "USD"];
  static languages = ["English", "French"];
  static jobTypes = ["Full-time", "Internship"];
  static roomPrivacy = ["Public", "Private", "Direct Messaging"];
}
