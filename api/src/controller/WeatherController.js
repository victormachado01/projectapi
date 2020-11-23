const climaTempoHelper = require('../helpers/climaTempo')
const Weather = require('../model/WeatherModel')

exports.get = async (req, res) => {
  const { city, UF } = req.params
  const response = await climaTempoHelper.getWeather(city, UF)

  return res.status(response.status).json(response.data)
}

exports.list = (req, res) => {
  Weather.find({}, function (err, weathers) {
    res.status(200).json(weathers)
  }).populate('city')
}