// Base URL
export const BASE_URL = process.env.NODE_ENV === "development" ?
  "https://dev.umigrate.ca"
  : "https://" + "umigrate.ca";

// Endpoints
export const USER_PROFILE_ENDPOINT = "/auth/user/";
export const USERS_ENDPOINT = "/api/users/";
export const ADS_ENDPOINT = "/api/ads/";
export const EVENTS_ENDPOINT = "/api/events/";
export const HOUSING_ENDPOINT = "/api/housing/";
export const JOBS_ENDPOINT = "/api/jobs/";
export const ROOMS_ENDPOINT = "/api/rooms/";
export const POLLS_ENDPOINT = "/api/polls/";
export const POSTS_ENDPOINT = "/api/posts/";
export const LOGIN_ENDPOINT = "/auth/login/";
export const LOGOUT_ENDPOINT = "/auth/logout/";
export const MESSAGING_WEBSOCKET = process.env.NODE_ENV === "development" ?
  "wss://dev.umigrate.ca/ws/messaging/"
  : "wss://umigrate.ca/ws/messaging/";
export const REGISTER_ENDPOINT = "/auth/registration/";

// Comments endpoints
export const AD_COMMENT_ENDPOINT = "/api/ads/comments/";
export const EVENTS_COMMENT_ENDPOINT = "/api/events/comments/";
export const HOUSING_COMMENT_ENDPOINT = "/api/housing/comments/";
export const POLLS_COMMENT_ENDPOINT = "/api/polls/comments/";
export const POSTS_COMMENT_ENDPOINT = "/api/posts/comments/";

// Extensions
export const LIKE_EXTENSION = "/like";
export const COMMENTS_EXTENSION = "/comments/";
export const MESSAGES_EXTENSION = "/messages/";

// Filters

// Pagination
export const OFFSET = "offset=";
export const LIMIT = 10;
