// Base URL
export const BASE_URL = "https://" + window.location.host;

// Endpoints
export const USERS_ENDPOINT = "/api/users/";
export const USER_SETTINGS_ENDPOINT = "/api/users/me/settings";
export const ADS_ENDPOINT = "/api/ads/";
export const EVENTS_ENDPOINT = "/api/events/";
export const HOUSING_ENDPOINT = "/api/housing/";
export const JOBS_ENDPOINT = "/api/jobs/";
export const ROOMS_ENDPOINT = "/api/users/";
export const POLLS_ENDPOINT = "/api/polls/";
export const POSTS_ENDPOINT = "/api/posts/";
export const CHANGE_PASSWORD_ENDPOINT = "/api/users/me/change-password";
export const MESSAGING_ROOMS_ENDPOINT = "/api/messaging/rooms/";
export const MESSAGES_ENDPOINT = "/api/messaging/rooms/messages/";
export const LOGIN_ENDPOINT = "/api/login";
export const LOGOUT_ENDPOINT = "/api/logout";
export const VERIFICATION_EMAIL_ENDPOINT = "/api/verification/email";
export const VERIFICATION_CODE_ENDPOINT = "/api/verification/code";
export const MESSAGING_WEBSOCKET = "wss://" + window.location.host + "/ws/messaging/";

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
