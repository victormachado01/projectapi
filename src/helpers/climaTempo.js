const climaTempoApiUrl = 'http://apiadvisor.climatempo.com.br/api/v1';
const token = 'bd7915b6e2fb5e65d284c44dfaffcb71';
const axios = require('axios');

const resultStructure ={
  'temperatura': undefined,
  'umidade': undefined,
  'datahora': undefined,
  'condicao': undefined,
  'pressao': undefined,
  'venVeloc': undefined,
  'cidade': undefined,
  'estado': undefined,
  'pais': undefined,
  'fonte': undefined
}

getCityId = (cityName, UF) => {
  return axios.get(`${climaTempoApiUrl}/locale/city?name=${cityName}&state=${UF}&token=${token}`).then(response => console.log(response))
}

exports.getWeather = (cityId) => {
  return axios.get(`${climaTempoApiUrl}/weather/${cityId}/current?token=${token}`).then(response => console.log(response))
}

getCityId('Marília', 'SP');