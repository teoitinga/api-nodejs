const express = require('express');
const routes = express.Router();

const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');

const {
    class_0,
    class_7,
    class_1,
    class_4,
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
routes.get(`${userPath}/find-by-name/:name`,  asynchandler(class_1), asynchandler(logincontroller.findbyname));

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
 * Rotas de Themes
 */
const ThemeController = require('./src/controllers/theme-controller');
const themeController = new ThemeController();

const themePath = '/api/v1/themes';

//routes.post(`${themePath}`,  asynchandler(class_0), asynchandler(themeController.create));
routes.get(`${themePath}`,  asynchandler(class_0), asynchandler(themeController.findall));
routes.get(`${themePath}/:id`,  asynchandler(class_1), asynchandler(themeController.findById));


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

routes.put(`${divisionPath}/:id`,  asynchandler(class_1), asynchandler(divisionController.update));
routes.put(`${divisionPath}/toggle-lock/:id`,  asynchandler(class_1), asynchandler(divisionController.toggleLock));
routes.put(`${divisionPath}/extend/:id`,  asynchandler(class_1), asynchandler(divisionController.extend));

/**
 * Rotas de Projects
 */
 const ProjectController = require('./src/controllers/project-controller');
 const projectcontroller = new ProjectController();
 
 const projectPath = '/api/v1/projects';
 const citiePath = '/api/v1/cities';
 const schoolingPath = '/api/v1/schooling';
 
 routes.post(`${projectPath}`, asynchandler(class_4), asynchandler(projectcontroller.create));
 routes.get(`${citiePath}/find-by-name/:name`,  asynchandler(class_1), asynchandler(projectcontroller.findbyname));
 routes.get(`${schoolingPath}/find-by-schooling/:name`,  asynchandler(class_1), asynchandler(projectcontroller.findbyschooling));
 
 /**
  * Rotas de Treatments
  */
 const TreatmentController = require('./src/controllers/treatment-controller');
 const treatmentcontroller = new TreatmentController();
 const treatmentPath = '/api/v1/treatments';

 routes.get(`${treatmentPath}/find-by-action/:action`,  asynchandler(class_1), asynchandler(treatmentcontroller.findByAction));
 routes.post(`${treatmentPath}/`,  asynchandler(class_1), asynchandler(treatmentcontroller.create));

 /**
  * Rotas de Customers
  */
 const CustomerController = require('./src/controllers/customer-controller');
 const customercontroller = new CustomerController();
 const customerPath = '/api/v1/customers';

 routes.get(`${customerPath}/:cpf`, asynchandler(customercontroller.findByCpf));


 /**
  * Rotas de Consultas de DAP's
  */
 const DapController = require('./src/controllers/dap-controller');
const CustomerService = require('./src/services/customer-service');
 const dapcontroller = new DapController();
 const dapPath = '/api/v1/dapweb';

 routes.get(`${dapPath}/find-by-cpf/:cpf`,  asynchandler(dapcontroller.findByCpf));
 routes.get(`${dapPath}/query-acerbity/:cpf`,  asynchandler(dapcontroller.queryAcerbity));
 
 
 routes.use((error, req, res, next)=>{
     console.error(error);
    res.status(error.status || 500).json(error || {message: 'Ocorreu um erro e não foi identificado, por favor entre em contato com o administrador do portal'});
})

module.exports = routes;