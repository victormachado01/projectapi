import api from '../api';

const list = async () => {
  return api.get(`/farm`);
}
const create = async (data) => {
  return api.post('/farm', data);
};

// const update = async (data) => {
//   return api.update('/farm', data);
// };

const frost = async (farm_id) => {
  return api.get(`/farm/${farm_id}/geada`)
}

export default {
  list,
  create,
  // update,
  frost
};
