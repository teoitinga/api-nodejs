const express = require('express');
const routes = express.Router();

const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');

const {
    class_0,
    class_7,
    class_1,
    class_10
} = require('./src/services/token-service');

//Definição de controllers
/**
 * Rotas de Login
 */
const IndexController = require('./src/controllers/index');
const indexController = new IndexController();

const indexPath = '/api/v1';

routes.get(`${indexPath}`, indexController.welcome);

//Definição de controllers
/**
 * Rotas de Login
 */
const LoginController = require('./src/controllers/login-controller');
const logincontroller = new LoginController();

const userPath = '/api/v1/users';

routes.post(`${userPath}/login`,  asynchandler(logincontroller.login));
routes.post(`${userPath}`,  asynchandler(class_7), asynchandler(logincontroller.create));
routes.get(`${userPath}`,  asynchandler(class_1), asynchandler(logincontroller.findall));
routes.get(`${userPath}/:id`,  asynchandler(class_1), asynchandler(logincontroller.findbyid));
routes.put(`${userPath}/:id`,  asynchandler(class_1), asynchandler(logincontroller.update));
routes.put(`${userPath}/recovery/:id`,  asynchandler(class_1), asynchandler(logincontroller.recovery));
routes.put(`${userPath}/toggle-lock/:id`,  asynchandler(class_1), asynchandler(logincontroller.toggleLock));
routes.put(`${userPath}/extend/:id`,  asynchandler(class_1), asynchandler(logincontroller.extend));

/**
 * Rotas de Roles
 */
const RoleController = require('./src/controllers/role-controller');
const rolecontroller = new RoleController();

const rolePath = '/api/v1/roles';

routes.post(`${rolePath}`,  asynchandler(class_0), asynchandler(rolecontroller.create));
routes.get(`${rolePath}`,  asynchandler(class_0), asynchandler(rolecontroller.findall));
routes.get(`${rolePath}/:id`,  asynchandler(class_1), asynchandler(rolecontroller.findById));


/**
 * Rotas de Contracts
 */
const ContractController = require('./src/controllers/contract-controller');
const contractcontroller = new ContractController();

const contractPath = '/api/v1/contracts';

routes.post(`${contractPath}`, asynchandler(class_10), asynchandler(contractcontroller.create));
routes.get(`${contractPath}`, asynchandler(class_10), asynchandler(contractcontroller.findall));
routes.post(`${contractPath}/tender`, asynchandler(class_7), asynchandler(contractcontroller.tender));

/**
 * Rotas de Division
 */
const DivisionController = require('./src/controllers/division-controller');
const divisionController = new DivisionController();

const divisionPath = '/api/v1/divisions';

routes.post(`${divisionPath}`,  asynchandler(class_7), asynchandler(divisionController.create));
routes.get(`${divisionPath}`,  asynchandler(class_1), asynchandler(divisionController.findall));
routes.get(`${divisionPath}/:id`,  asynchandler(class_1), asynchandler(divisionController.findById));

routes.use((error, req, res, next)=>{
    console.error(error);
    res.status(error.status || 500).json(error || {message: 'Ocorreu um erro e não foi identificado, por favor entre em contato com o administrador do portal'});
})

module.exports = routes;