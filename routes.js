const { Router } = require('express');
const express = require('express');
const routes = express.Router();


const jwt = require('jsonwebtoken');
const {
    class_0,
    class_10
} = require('./src/services/token-service');

//Definição de controllers
/**
 * Rotas de Login
 */
const LoginController = require('./src/controllers/login-controller');
const logincontroller = new LoginController();

const apiUserPath = '/api/v1/users';

routes.post(`${apiUserPath}/login`, class_0, logincontroller.login);
routes.post(`${apiUserPath}`, class_10, logincontroller.create);
routes.get(`${apiUserPath}`, class_10, logincontroller.findall);

/**
 * Rotas de Roles
 */
const RoleController = require('./src/controllers/role-controller');
const rolecontroller = new RoleController();

const apiRolePath = '/api/v1/roles';

routes.post(apiRolePath, class_10, rolecontroller.create);
routes.get(apiRolePath, class_10, rolecontroller.findall);

/**
 * Rotas de Contracts
 */
const ContractController = require('./src/controllers/contract-controller');
const contractcontroller = new ContractController();

const apiContractPath = '/api/v1/contracts';

routes.post(apiContractPath, class_10, contractcontroller.create);
routes.get(apiContractPath, class_10, contractcontroller.findall);


module.exports = routes;