import api from '../api';

const list = async () => {
  return api.get(`/fazendas`);
}
const create = async (data) => {
  return api.post('/fazendas', data);
};

// const update = async (data) => {
//   return api.update('/fazendas', data);
// };

const frost = async (fazendas_id) => {
  return api.get(`/fazendas/${fazendas_id}/geada`)
}

export default {
  list,
  create,
  // update,
  frost
};
