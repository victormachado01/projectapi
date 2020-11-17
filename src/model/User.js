const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model;

const UserModel = Schema({
  name: String,
  email: { type: String, index: { unique: true } },
  phone: String,
  password: String,
});

module.exports = model('User', UserModel);