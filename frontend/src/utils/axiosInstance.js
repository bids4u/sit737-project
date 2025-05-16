import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL+'/api';

const axiosInstance = axios.create({
  baseURL:  baseURL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove the invalid token from localStorage
      localStorage.removeItem('authToken');
      // Redirect to the home page
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
