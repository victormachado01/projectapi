const Router = require('express').Router;
const CityController = require('../controller/CityController')
const auth = require('../middlewares/auth');

const Route = Router();

Route.get('/', CityController.list)
module.exports = Route;
