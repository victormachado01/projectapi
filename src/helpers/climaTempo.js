const climaTempoApiUrl = 'https://apiadvisor.climatempo.com.br/api/v1';
const token = 'bd7915b6e2fb5e65d284c44dfaffcb71';
const axios = require('axios');

const getCityId = async (cityName, UF) => {
  return axios.get(encodeURI(`${climaTempoApiUrl}/locale/city?name=${cityName}&state=${UF}&token=${token}`))
    .then(response => response.data[0].id)
    .catch(err => console.log(err.message))
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

      for(let keyCity in dataCity) {
        if(keyCity !== 'data')
          responseStructure[keyCity] = dataCity[keyCity]
      }

      for(let key in responseStructure) {
        if(dataWeather[key]) {
          responseStructure[key] = dataWeather[key]
        }
      }

      
      return responseStructure
    })
    .catch(err => console.log(err))
}
