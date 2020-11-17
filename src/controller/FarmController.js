const Farm = require('../model/FarmModel')
const climaTempoHelper = require('../helpers/climaTempo');

exports.list = (req, res) => {
  Farm.find({}, function (err, farms) {
    res.status(200).json({ fazendas: farms })
  }).populate("address.city").populate("owner")
}

exports.create = (req, res) => {
  const owner = req.user
  const { city_id, number, name } = req.body

  const new_farm = new Farm({ owner: owner.id, name, address: { number, city: city_id } })
  new_farm.save((err, response) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(201).json({ data: response })
    }
  })
}

exports.update = async (req, res) => {
  const owner = req.user
  const { city_id, number, name } = req.body
  const { farm_id } = req.params

  Farm.update({ _id: farm_id }, {
    name,
    address: {
      number,
      city_id
    }
  }, (err, response) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(201).json({ data: response })
    }
  })
}

exports.delete = (req, res) => {
  const { farm_id } = req.params;

  Farm.deleteOne({ _id: farm_id }, (err, response) => {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      res.status(200).json({ data: 'Fazenda removida com sucesso' })
    }
  })
}

exports.frost = async (req, res) => {
  const { farm_id } = req.params;

  Farm.findById(farm_id, async function (err, farm) {
    if (err) {
      res.status(500).json({ error: err.message })
    } else {
      const response = await climaTempoHelper.getWeather(farm.address.city.name, farm.address.city.state);

      return res.status(200).json({ 'frost': frostChecker(response.humidity, response.wind_velocity, response.temperature) })
    }
  }).populate('address.city')
}



function frostChecker(humidity, wind, temp) {
  const frostTypes = ['Nenhuma', 'Geada Branca', "Geada Negra"]

  if (humidity >= 45 && wind < 8 && temp < 10) {
    return frostTypes[1]
  }

  if (humidity < 45 && wind > 8 && temp < 10) {
    return frostTypes[2]
  }

  return frostTypes[0]
}
