import axios from 'axios';

const localURL = 'http://localhost:8080';
// const deployURL = 'https://p2-aquitetura-de-apis.herokuapp.com';

const api = axios.create({
  baseURL: process.env.URL || localURL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }

  return config;
});

export default api;
