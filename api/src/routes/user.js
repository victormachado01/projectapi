const Router = require('express').Router;
const userController = require("../controller/UserController")
const Route = Router();

Route.post('/', userController.CreateUser);
Route.post('/auth', userController.authenticate);

module.exports = Route;