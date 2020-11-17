const City = require('../model/CityModel')

exports.list = (req, res) => {
  City.find({}, function (err, cities) {
    res.status(200).json(cities)
  })
}