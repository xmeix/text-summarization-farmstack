import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://127.0.0.1:8000/";

export const publicRequest = axios.create({
  baseURL: API_BASE_URL,
});

export const getJwtTokenFromCookie = () => {
  const cookie = Cookies.get("access_token");

  console.log(cookie);
  return cookie ? cookie : undefined;
};
export const token = getJwtTokenFromCookie();

export const userRequest = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  },
  withCredentials: true,
});

userRequest.interceptors.request.use(
  (config) => {
    const token = getJwtTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  public: {
    get: (url, config) => publicRequest.get(url, config),
    post: (url, data, config) => publicRequest.post(url, data, config),
  },
  user: {
    get: (url, config) => userRequest.get(url, config),
    post: (url, data, config) => userRequest.post(url, data, config),
    put: (url, data, config) => userRequest.put(url, data, config),
    delete: (url, config) => userRequest.delete(url, config),
  },
};
