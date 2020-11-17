const climaTempoApiUrl = 'https://apiadvisor.climatempo.com.br/api/v1';
const token = 'bd7915b6e2fb5e65d284c44dfaffcb71';
const axios = require('axios');
const City = require('../model/CityModel');
const Weather = require('../model/WeatherModel')
const getCityId = async (cityName, UF) => {
  return axios.get(encodeURI(`${climaTempoApiUrl}/locale/city?name=${cityName}&state=${UF}&token=${token}`))
    .then(response => response.data[0].id)
    .catch(err => ({ status: 500, data: { error: err.message } }))
}

exports.getWeather = async (cityName, UF) => {
  const cityId = await getCityId(cityName, UF)

  const responseStructure = {
    id: undefined,
    name: undefined,
    state: undefined,
    country: undefined,
    temperature: undefined,
    humidity: undefined,
    date: undefined,
    wind_direction: undefined,
    wind_velocity: undefined,
    condition: undefined,
    pressure: undefined,
    icon: undefined,
    sensation: undefined,
  }

  return axios.get(`${climaTempoApiUrl}/weather/locale/${cityId}/current?token=${token}`)
    .then(response => {
      const dataCity = response.data
      const dataWeather = dataCity.data

      for (let keyCity in dataCity) {
        if (keyCity !== 'data')
          responseStructure[keyCity] = dataCity[keyCity]
      }

      for (let key in responseStructure) {
        if (dataWeather[key]) {
          responseStructure[key] = dataWeather[key]
        }
      }
      City.findOne({ name: dataCity.name, state: dataCity.state, country: dataCity.country }, function (err, city) {
        if (!city) {
          city = new City({ name: dataCity.name, state: dataCity.state, country: dataCity.country });
          city.save((err, new_city) => {
            const new_weather = new Weather({ ...responseStructure, city: new_city._id })
            new_weather.save()
          })
        } else {
          const new_weather = new Weather({ ...responseStructure, city: city._id })
          new_weather.save()
        }
      })

      return { status: 200, data: responseStructure }
    })
    .catch(err => ({ status: 500, data: { error: err.message } }))
}
