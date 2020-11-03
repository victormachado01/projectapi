const mongoose = require('mongoose')

const WeatherModel = mongoose.model('Weather', {
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

module.exports = new WeatherModel