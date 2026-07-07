import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',   // Development ke liye
  // baseURL: 'https://your-production-domain.com', // Production ke liye
  timeout: 10000,
  
});

// Request interceptor (Token attach karne ke liye)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const currentPath = window.location.pathname;

    if (
      error.response?.status === 401 &&
      currentPath !== '/login'
    ) {
      localStorage.clear();
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;