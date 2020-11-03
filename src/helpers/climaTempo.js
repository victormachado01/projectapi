const climaTempoApiUrl = 'https://apiadvisor.climatempo.com.br/api/v1';
const token = 'bd7915b6e2fb5e65d284c44dfaffcb71';
const axios = require('axios');

const resultStructure = {
  temperatura: undefined,
  umidade: undefined,
  datahora: undefined,
  condicao: undefined,
  pressao: undefined,
  venVeloc: undefined,
  cidade: undefined,
  estado: undefined,
  pais: undefined,
  fonte: undefined
}

const responseStructure = {
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

const getCityId = async (cityName, UF) => {
  //...............//
  return axios.get(encodeURI(`${climaTempoApiUrl}/locale/city?name=${cityName}&state=${UF}&token=${token}`))
    .then(response => response.data[0].id)
    .catch(err => console.log(err.message))
}

const getWeather = async () => {
  const cityId = await getCityId('Marília', 'SP')
  return axios.get(`${climaTempoApiUrl}/weather/locale/${cityId}/current?token=${token}`)
    .then(response => console.log(response.data))
    .catch(err => console.log(err))
}

getWeather()