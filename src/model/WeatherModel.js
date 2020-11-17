const mongoose = require('mongoose');
const CityModel = require('./CityModel');
const Schema = mongoose.Schema;
const model = mongoose.model;

const WeatherModel = Schema({
  city: { type: Schema.Types.ObjectId, ref: "City" },
  temperature: Number,
  humidity: Number,
  date: Date,
  wind_direction: String,
  wind_velocity: Number,
  condition: String,
  pressure: Number,
  icon: String,
  sensation: Number,
})

module.exports = model('Weather', WeatherModel);