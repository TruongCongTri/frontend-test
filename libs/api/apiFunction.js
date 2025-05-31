import API from "./api";
import { API_ENDPOINTS } from "./endpoints";

// AUTH
export const createAccessCode = (payload) =>
  API.post(API_ENDPOINTS.AUTH.CREATE_CODE, payload);

export const validateAccessCode = (payload) =>
  API.post(API_ENDPOINTS.AUTH.VALIDATE_CODE, payload);

// GITHUB
export const searchGithubUsers = (params) =>
  API.get(API_ENDPOINTS.GITHUB.SEARCH_USERS, { params });

export const findGithubUserProfile = (id) =>
  API.get(API_ENDPOINTS.GITHUB.USER_PROFILE, {
    params: { github_user_id: id },
  });

// USER
export const likeGithubUser = (payload) =>
  API.post(API_ENDPOINTS.USER.LIKE_GITHUB_USER, payload);

export const getUserProfile = (phone_number) =>
  API.get(API_ENDPOINTS.USER.GET_USER_PROFILE, {
    params: { phone_number },
  });

export const getLikedGithub = (phone_number) =>
  API.get(API_ENDPOINTS.USER.GET_LIKED_GITHUB, {
    params: { phone_number },
  });
