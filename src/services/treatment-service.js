const moment = require('moment');
const uuid = require('uuid');


const UserCache = require('../core/cache-user');
const cache = new UserCache();

const ActionModel = require('../../models/action');

const { ServerErrorException } = require('../exceptions/server-exception');
const { Op } = require("sequelize");

const treatmentModel = require('../../models/treatment');
const Treatment_Customer = require('../../models/treatment-customer');

const CustomerService = require('../services/customer-service');
const customerService = new CustomerService();

const TaskService = require('../services/task-service');
const taskService = new TaskService();

class TreatmentService {

    async findByAction(request) {

        const action = request.params['action'];
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;

        const query = `
        SELECT actions.id, actions.description,  actions.referency, actions.qtdAtendimentos, actions.valorPorAtendimento
        FROM smart.actions left join projects on actions.project_id = projects.id
        where referency like('%${action}%')
        and projects.lockedDate is null
        and now()>start
        and now()<end
        and projects.partner_id = '${partner_id}'
        and projects.division_id = '${division_id}'
        ;
        `;

        const actions = await ActionModel.sequelize.query(query);
        return actions[0];
    }

    async create(request) {

        const credendial = await cache.getCredencial(request);

        const activeUser = credendial.userId;

        const treatment = request.body;

        /**Define variáveis auxiliares */
        treatment.id = uuid.v4().toUpperCase();
        treatment.createdby = credendial.userId;
        treatment.created = moment();
        /**
         * Registra a Treatment
         */
        //treatment = await store(treatment);
        console.log(treatment);
        /**
         * Registra todos os beneficiários
         */
        const customers = treatment.customers;

        //Array com ID's de beneficiários para registrar no banco de dados
        
        if (!customers) {
            //lança erro de beneficiários não encontrado
        }
        
        await validaCustomers(customers, credendial, treatment.id);

        /**
         * Registra todas as tasks
         */
        const tasks = treatment.tasks;
        if (!tasks) {
            //lança erro de task não encontrada
        }
        tasks.forEach(async function (t) {
            t.treatment_id = treatment.id;
            customer = await taskService.create(c, credendial);

        })

    }
    
    async validaCustomers(customers, credendial, treatmentId) {

        customers.forEach(async function (c) {
            //verifica se já existe o beneficiario. 
            let customer = await customerService.findbyCpf(c, credendial);

            if (customer.length === 0) {
                //Se não existir, faça o registro
                customer = await customerService.create(c, credendial);
                //await customersIds.push(customer[0].id);
                await treatmentStoreCustomer(customer, treatmentId);
            }
            if (customer.length === 1) {
                await treatmentStoreCustomer(customer, treatmentId);
            }
            if (customer.length > 1) {
                //lança erro emissão pode regisrar este beneficiário
            }
            //return undefined;
            //Caso exista não atualize. 
        });
    }

    async store(treatment) {
        return await treatmentModel.create(treatment);
    }

    async treatmentStoreCustomer(customer, treatmentId) {
        const tc = {
            id: uuid.v4().toUpperCase(),
            treatment_id: treatmentId,
            customer_id: customerId,
            createdby: customer.createdby,
            created: moment()
        }
        return await Treatment_Customer.create(tc);
    }
}
module.exports = TreatmentService;