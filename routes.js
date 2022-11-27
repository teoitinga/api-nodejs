const express = require('express');
const routes = express.Router();

const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');

//const multer = require('multer');
//const multerLocal = require('../ares-api/src/core/multer-config');
const multerLocal = require('./src/core/multer-config');

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

routes.post(`${userPath}/reg-route`, asynchandler(logincontroller.regroute));
routes.post(`${userPath}/login`, asynchandler(logincontroller.login));
routes.post(`${userPath}`, asynchandler(class_7), asynchandler(logincontroller.create));
routes.get(`${userPath}`, asynchandler(class_1), asynchandler(logincontroller.findall));
routes.get(`${userPath}/find-by-id/:id`, asynchandler(class_1), asynchandler(logincontroller.findbyid));
routes.put(`${userPath}/:id`, asynchandler(class_1), asynchandler(logincontroller.update));
routes.put(`${userPath}/recovery/:id`, asynchandler(class_1), asynchandler(logincontroller.recovery));
routes.put(`${userPath}/toggle-lock/:id`, asynchandler(class_1), asynchandler(logincontroller.toggleLock));
routes.put(`${userPath}/extend/:id`, asynchandler(class_1), asynchandler(logincontroller.extend));
routes.get(`${userPath}/find-by-name/:name`, asynchandler(class_1), asynchandler(logincontroller.findbyname));
routes.get(`${userPath}/find-by-func/:name`, asynchandler(class_1), asynchandler(logincontroller.findbyfunc));
routes.get(`${userPath}/count-my-tasks`, asynchandler(class_1), asynchandler(logincontroller.countMyTasks));
routes.get(`${userPath}/my-tasks`, asynchandler(class_1), asynchandler(logincontroller.findMyTasks));
routes.put(`${userPath}/finalize/:id`, asynchandler(class_1), asynchandler(logincontroller.finalizeTasks));
routes.put(`${userPath}/cancel/:id`, asynchandler(class_1), asynchandler(logincontroller.cancelTasks));
routes.put(`${userPath}/expire/:id`, asynchandler(class_1), asynchandler(logincontroller.expireTasks));
routes.put(`${userPath}/restart/:id`, asynchandler(class_1), asynchandler(logincontroller.restartTasks));

/** GETs de dados para gestão */
routes.get(`${userPath}/reports/all-projects`, asynchandler(class_1), asynchandler(logincontroller.countProjects));
routes.get(`${userPath}/reports/all-treatments`, asynchandler(class_1), asynchandler(logincontroller.allTreatments));
routes.get(`${userPath}/reports/all-customers`, asynchandler(class_1), asynchandler(logincontroller.allCustomers));
routes.get(`${userPath}/reports/all-treatments-by-date/:inicial/:final`, asynchandler(class_1), asynchandler(logincontroller.allTreatmentsByDate));


/**
 * Rotas de indicadores
 */
const IndicatorsController = require('./src/controllers/indicators-controller');
const indicatorscontroller = new IndicatorsController();

const indicatorPath = '/api/v1/users';
routes.get(`${indicatorPath}/recoverypassword/:registry/:password`, asynchandler(class_1), asynchandler(logincontroller.recoverypassword));
routes.get(`${indicatorPath}/reports/indicators-last-10-leite`, asynchandler(class_1), asynchandler(indicatorscontroller.cepceaLeiteMG));
routes.get(`${indicatorPath}/reports/indicators-last-10-boi`, asynchandler(class_1), asynchandler(indicatorscontroller.cepeaBoi));
routes.get(`${indicatorPath}/reports/indicators-last-10-bezerro`, asynchandler(class_1), asynchandler(indicatorscontroller.cepeaBezerro));
routes.get(`${indicatorPath}/reports/indicators-last-10-milho`, asynchandler(class_1), asynchandler(indicatorscontroller.cepeaMilho));
routes.get(`${indicatorPath}/reports/indicators-last-10-cafe-arabica`, asynchandler(class_1), asynchandler(indicatorscontroller.cepeaCafeArabica));
routes.get(`${indicatorPath}/reports/indicators-last-10-cafe-robusta`, asynchandler(class_1), asynchandler(indicatorscontroller.cepeaCafeRobusta));
routes.get(`${indicatorPath}/reports/indicators-actual-prices`, asynchandler(class_1), asynchandler(indicatorscontroller.actualPrices));
routes.get(`${indicatorPath}/reports/reload-cepea`, asynchandler(class_1), asynchandler(indicatorscontroller.reloadCepea));
routes.get(`${indicatorPath}/reports/update-cepea`, asynchandler(class_1), asynchandler(indicatorscontroller.updateCepea));

/**Fim de gets para gestão */
/**
 * Rotas de Roles
 */
const RoleController = require('./src/controllers/role-controller');
const rolecontroller = new RoleController();

const rolePath = '/api/v1/roles';

routes.post(`${rolePath}`, asynchandler(class_0), asynchandler(rolecontroller.create));
routes.get(`${rolePath}`, asynchandler(class_0), asynchandler(rolecontroller.findall));
routes.get(`${rolePath}/:id`, asynchandler(class_1), asynchandler(rolecontroller.findById));

/**
 * Rotas de Themes
 */
const ThemeController = require('./src/controllers/theme-controller');
const themeController = new ThemeController();

const themePath = '/api/v1/themes';

//routes.post(`${themePath}`,  asynchandler(class_0), asynchandler(themeController.create));
routes.get(`${themePath}`, asynchandler(class_0), asynchandler(themeController.findall));
routes.get(`${themePath}/:id`, asynchandler(class_1), asynchandler(themeController.findById));


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

routes.post(`${divisionPath}`, asynchandler(class_7), asynchandler(divisionController.create));
routes.get(`${divisionPath}`, asynchandler(class_1), asynchandler(divisionController.findall));
routes.get(`${divisionPath}/:id`, asynchandler(class_1), asynchandler(divisionController.findById));

routes.put(`${divisionPath}/:id`, asynchandler(class_1), asynchandler(divisionController.update));
routes.put(`${divisionPath}/toggle-lock/:id`, asynchandler(class_1), asynchandler(divisionController.toggleLock));
routes.put(`${divisionPath}/extend/:id`, asynchandler(class_1), asynchandler(divisionController.extend));

/**
 * Rotas de Projects
 */
const ProjectController = require('./src/controllers/project-controller');
const projectcontroller = new ProjectController();

const projectPath = '/api/v1/projects';
const citiePath = '/api/v1/cities';
const schoolingPath = '/api/v1/schooling';

routes.post(`${projectPath}`, asynchandler(class_4), asynchandler(projectcontroller.create));
routes.get(`${projectPath}/find-all`, asynchandler(class_1), asynchandler(projectcontroller.findAll));
routes.get(`${projectPath}/find-by-id/:projectId`, asynchandler(class_1), asynchandler(projectcontroller.findById));
routes.get(`${projectPath}/find-all-actions/:projectId`, asynchandler(class_1), asynchandler(projectcontroller.findAllActions));
routes.get(`${citiePath}/find-by-name/:name`, asynchandler(class_1), asynchandler(projectcontroller.findbyname));
routes.get(`${schoolingPath}/find-by-schooling/:name`, asynchandler(class_1), asynchandler(projectcontroller.findbyschooling));

/**
 * Rotas de Treatments
 */
const TreatmentController = require('./src/controllers/treatment-controller');
const treatmentcontroller = new TreatmentController();
const treatmentPath = '/api/v1/treatments';

routes.get(`${treatmentPath}/find-by-action/:action`, asynchandler(class_1), asynchandler(treatmentcontroller.findByAction));
routes.post(`${treatmentPath}/`, asynchandler(class_1), multerLocal.single('rater'), asynchandler(treatmentcontroller.create));

/**
 * Rotas de Customers
 */
const CustomerController = require('./src/controllers/customer-controller');
const customercontroller = new CustomerController();
const customerPath = '/api/v1/customers';

routes.get(`${customerPath}/:cpf`, asynchandler(customercontroller.findByCpf));

/**
 * Rotas Python Server
 */
const PythonController = require('./src/controllers/python-controller');
const pythoncontroller = new PythonController();
const pythonPath = '/api/v1/ares-data';

routes.post(`${pythonPath}/titulos`, asynchandler(pythoncontroller.queryFarms));
routes.post(`${pythonPath}/ater`, asynchandler(pythoncontroller.generateRater));
routes.post(`${pythonPath}/send-ater`, asynchandler(pythoncontroller.sendReportAter));


/**
 * Rotas de Consultas de DAP's
 */
const DapController = require('./src/controllers/dap-controller');
const CustomerService = require('./src/services/customer-service');
const dapcontroller = new DapController();
const dapPath = '/api/v1/dapweb';

routes.get(`${dapPath}/find-by-cpf/:cpf`, asynchandler(dapcontroller.findByCpf));
routes.get(`${dapPath}/query-acerbity/:cpf`, asynchandler(dapcontroller.queryAcerbity));

const UploadController = require('./src/controllers/upload-controller');
const uploadController = new UploadController();
const uploadPath = '/api/v1/upload';
routes.post(`${uploadPath}/rater`, asynchandler(class_10), multerLocal.single('rater'), asynchandler(uploadController.createRater));


/**
 * Roatas para tasks
 */
const TaskController = require('./src/controllers/task-controller');
const taskController = new TaskController();
const taskPath = '/api/v1/tasks'
routes.post(`${taskPath}/add-comment`, asynchandler(class_1), asynchandler(taskController.addComment));


/**
 * 
 */
routes.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json(error || { message: 'Ocorreu um erro e não foi identificado, por favor entre em contato com o administrador do portal' });
})

module.exports = routes;