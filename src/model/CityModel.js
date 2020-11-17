const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model;

const CityModel = Schema({
  name: String,
  state: String,
  country: String,
})

module.exports = model('City', CityModel);