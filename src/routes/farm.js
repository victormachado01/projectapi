const Router = require('express').Router;
const FarmController = require('../controller/FarmController')
const auth = require('../middlewares/auth');

const Route = Router();

Route.get('/', FarmController.list);
Route.post('/', auth(), FarmController.create);
Route.get('/:farm_id/geada', FarmController.frost);

module.exports = Route;
