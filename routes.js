const { Router } = require('express');
const express = require('express');
const routes = express.Router();
//const asyncHandler = require('express-async-handler');
const resolver = require('./src/exceptions/resolver');

const jwt = require('jsonwebtoken');

const {
    class_0,
    class_10
} = require('./src/services/token-service');

//Definição de controllers
/**
 * Rotas de Login
 */
const IndexController = require('./src/controllers/index');
const indexController = new IndexController();

const apiIndexPath = '/api/v1';

routes.get(`${apiIndexPath}`, indexController.welcome);

//Definição de controllers
/**
 * Rotas de Login
 */
const LoginController = require('./src/controllers/login-controller');
const logincontroller = new LoginController();

const apiUserPath = '/api/v1/users';

routes.post(`${apiUserPath}/login`, (class_0),  resolver(logincontroller.login));
routes.post(`${apiUserPath}`,  (class_0), logincontroller.create);
routes.get(`${apiUserPath}`,  (class_0), logincontroller.findall);

/**
 * Rotas de Roles
 */
const RoleController = require('./src/controllers/role-controller');
const rolecontroller = new RoleController();

const apiRolePath = '/api/v1/roles';

routes.post(apiRolePath,  (class_0), rolecontroller.create);
routes.get(apiRolePath,  (class_0), rolecontroller.findall);

/**
 * Rotas de Contracts
 */
const ContractController = require('./src/controllers/contract-controller');
const contractcontroller = new ContractController();

const apiContractPath = '/api/v1/contracts';

routes.post(apiContractPath, class_10, contractcontroller.create);
routes.get(apiContractPath, class_10, contractcontroller.findall);


module.exports = routes;