import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AUTH_BYPASS_PATHS = ['/api/auth/login', '/api/auth/register'];

const isBypassAuthRedirectRequest = (requestUrl = '') =>
  AUTH_BYPASS_PATHS.some((path) => requestUrl.includes(path));

const redirectToLogin = () => {
  if (import.meta.env.PROD) {
    window.location.hash = '#/login';
    return;
  }

  window.location.href = '/login';
};

const getStoredUser = () => {
  const rawUser = localStorage.getItem('user');
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const user = getStoredUser();
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || '';

    if (error.response?.status === 401 && !isBypassAuthRedirectRequest(requestUrl)) {
      localStorage.removeItem('user');
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

export default api;
