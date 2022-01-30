const { Router } = require('express');
const express = require('express');
const routes = express.Router();


const jwt = require('jsonwebtoken');
const {
    class_10,
    class_06,
    class_03,
    class_02,
    class_01,
    class_00
} = require('./src/services/token-service');

//Definição de controllers
/**
 * Rotas de Login
 */
const LoginController = require('./src/controllers/login-controller');
logincontroller = new LoginController();

routes.post('/api/v1/users/login', class_00, logincontroller.login);
routes.post('/api/v1/users', class_06, logincontroller.create);
routes.get('/api/v1/users', class_06, logincontroller.findall);

/**
 * Rotas de Roles
 */
const RoleController = require('./src/controllers/role-controller');
rolecontroller = new RoleController();

routes.post('/api/v1/roles', class_10, rolecontroller.create);
routes.get('/api/v1/roles', class_00, rolecontroller.findall);


module.exports = routes;