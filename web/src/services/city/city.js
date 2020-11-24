import api from '../api';

const list = async () => {
  return api.get(`/cidades`);
}

export default {
  list,
};
