const Router = require('express').Router;
const WeatherController = require('../controller/WeatherController')
const auth = require('../middlewares/auth');

const Route = Router();

Route.get('/', WeatherController.list)
Route.get('/:city/:UF', auth(), WeatherController.get);
module.exports = Route;
