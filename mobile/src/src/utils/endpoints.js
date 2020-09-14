import Axios from "axios";

// Base URL
const BASE_URL = process.env.NODE_ENV === "development" ?
  "https://dev.umigrate.ca"
  : "https://umigrate.ca";

// Websocket URLs
const MESSAGING_WEBSOCKET = process.env.NODE_ENV === "development" ?
  "wss://dev.umigrate.ca/ws/messaging/"
  : "wss://umigrate.ca/ws/messaging/";

// Base endpoint class
class BaseEndpoint {
  static endpoint = "";

  static list(page, filters = {}, handleSuccess = (response) => {}, handleError = (error) => {}) {
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

  static post(data, handleSuccess = (response) => {}, handleError = (error) => {}) {
    Axios.post(BASE_URL + this.endpoint, data)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static get(id, handleSuccess = (response) => {}, handleError = (error) => {}) {
    Axios.get(BASE_URL + this.endpoint + id)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static patch(id, data, handleSuccess = (response) => {}, handleError = (error) => {}) {
    Axios.patch(BASE_URL + this.endpoint + id, data)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static delete(id, handleSuccess = (response) => {}, handleError = (error) => {}) {
    Axios.delete(BASE_URL + this.endpoint + id)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}

// Endpoints
export class AdsEndpoint extends BaseEndpoint {
  static endpoint = "/api/ads/";
}

export class AdCommentsEndpoint extends BaseEndpoint {
  static endpoint = "/api/ads/comments/";
}

export class EventsEndpoint extends BaseEndpoint {
  static endpoint = "/api/events/";
}

export class EventCommentsEndpoint extends BaseEndpoint {
  static endpoint = "/api/events/comments/";
}

export class ListingsEndpoint extends BaseEndpoint {
  static endpoint = "/api/listings/";
}

export class ListingCommentsEndpoint extends BaseEndpoint {
  static endpoint = "/api/listings/comments/";
}

export class JobsEndpoint extends BaseEndpoint {
  static endpoint = "/api/jobs/";
}

export class RoomsEndpoint extends BaseEndpoint {
  static endpoint = "/api/rooms/";
}

export class MessagesEndpoint {
  static list(page, filters = {}, handleSuccess = (response) => {}, handleError = (error) => {}) {
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

export class PollsEndpoint extends BaseEndpoint {
  static endpoint = "/api/polls/";
}

export class PollCommentsEndpoint extends BaseEndpoint {
  static endpoint = "/api/polls/comments/";
}

export class PostsEndpoint extends BaseEndpoint {
  static endpoint = "/api/posts/";
}

export class PostCommentsEndpoint extends BaseEndpoint {
  static endpoint = "/api/posts/comments/";
}

export class AuthEndpoint {
  static login(data, handleSuccess = (response) => {}, handleError = (error) => {}) {
    Axios.post(BASE_URL + "/auth/login/", data)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static logout(handleSuccess = (response) => {}, handleError = (error) => {}) {
    Axios.post(BASE_URL + "/auth/logout/")
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static register(data, handleSuccess = (response) => {}, handleError = (error) => {}) {
    Axios.post(BASE_URL + "/auth/registration/", data)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}

export class UsersEndpoint {
  static list(page, filters = {}, handleSuccess = (response) => {}, handleError = (error) => {}) {
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

  static get(id, handleSuccess = (response) => {}, handleError = (error) => {}) {
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
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  static patch(data, handleSuccess = (response) => {}, handleError = (error) => {}) {
    Axios.patch(BASE_URL + "/auth/user/", data)
      .then((response) => {
        handleSuccess(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }
}