import api from '../api';

const login = async ({ email, pass }) => {
  return api.post('/user/auth', {
    email,
    password: pass,
  });
};

const register = async (data) => {
  return api.post('/user', data);
};

export default {
  login,
  register,
};
