import axios from 'axios';

const localURL = 'http://localhost:8080';

const api = axios.create({
  baseURL: process.env.URL || localURL,
});

api.interceptors.request.use(async (config) => {
  const token = await localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }

  return config;
});

export default api;
