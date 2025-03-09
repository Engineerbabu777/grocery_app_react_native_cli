import {tokenStorage} from '@state/storage';
import {refreshAccessToken} from './authServce';
import {BASE_URL} from './config';
import axios from 'axios';

const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
  async config => {
    const accessToken = tokenStorage.getString('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      console.warn('⚠️ Token expired, attempting refresh...');
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return api.request(error.config);
      }
    }
    return Promise.reject(error);
  },
);
