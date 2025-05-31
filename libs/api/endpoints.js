const BASE = "/api";

export const API_ENDPOINTS = {
  AUTH: {
    CREATE_CODE: `${BASE}/auth/create-code`,
    VALIDATE_CODE: `${BASE}/auth/validate-code`,
  },
  GITHUB: {
    SEARCH_USERS: `${BASE}/github/search`,
    USER_PROFILE: `${BASE}/github/user-profile`,
  },
  USER: {
    LIKE_GITHUB_USER: `${BASE}/user/like-github-user`,
    GET_USER_PROFILE: `${BASE}/user/profile`,
    GET_LIKED_GITHUB: `${BASE}/user/profile/liked-github`,
  },
};
