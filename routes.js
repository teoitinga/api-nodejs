const express = require('express');
const routes = express.Router();

const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');

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

routes.post(`${apiUserPath}/login`, asynchandler(class_0),  asynchandler(logincontroller.login));
routes.post(`${apiUserPath}`,  asynchandler(class_0), asynchandler(logincontroller.create));
routes.get(`${apiUserPath}`,  asynchandler(class_10), asynchandler(logincontroller.findall));

/**
 * Rotas de Roles
 */
const RoleController = require('./src/controllers/role-controller');
const rolecontroller = new RoleController();

const apiRolePath = '/api/v1/roles';

routes.post(apiRolePath,  asynchandler(class_0), asynchandler(rolecontroller.create));
routes.get(apiRolePath,  asynchandler(class_0), asynchandler(rolecontroller.findall));

/**
 * Rotas de Contracts
 */
const ContractController = require('./src/controllers/contract-controller');
const contractcontroller = new ContractController();

const apiContractPath = '/api/v1/contracts';

routes.post(`${apiContractPath}`, asynchandler(class_10), asynchandler(contractcontroller.create));
routes.get(`${apiContractPath}`, asynchandler(class_10), asynchandler(contractcontroller.findall));
routes.post(`${apiContractPath}/tender`, asynchandler(class_0), asynchandler(contractcontroller.tender));


routes.use((error, req, res, next)=>{
    console.error(error);
    res.status(error.status || 500).json(error);
})

module.exports = routes;