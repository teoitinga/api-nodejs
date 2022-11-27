const moment = require('moment');
const uuid = require('uuid');


const UserCache = require('../core/cache-user');
const cache = new UserCache();

const ActionModel = require('../../models/action');

const { TreatmentException } = require('../exceptions/treatment-exception');

const { Op } = require("sequelize");

const treatmentModel = require('../../models/treatment');
const Treatment_Customer = require('../../models/treatment-customers');

const CustomerService = require('../services/customer-service');
const customerService = new CustomerService();

const TaskService = require('../services/task-service');
const taskService = new TaskService();

const RegProducao = require('../services/producao-register-service')
const regProducao = new RegProducao();

class TreatmentService {

    async findByAction(request) {

        const action = request.params['action'];
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;

        const query = `
        SELECT actions.id, actions.description,  actions.referency, actions.qtdAtendimentos, actions.valorPorAtendimento
        FROM actions left join projects on actions.project_id = projects.id
        where referency like('%${action}%')
        and projects.lockedDate is null
        and now()>start
        and now()<end
        and projects.partner_id = '${partner_id}'
        and projects.division_id = '${division_id}'
        ;
        `;

        const actions = await ActionModel.sequelize.query(query, { type: ActionModel.sequelize.QueryTypes.SELECT });
        return actions;
    }
    async treatmentStoreCustomer(customer, treatmentId, credendial) {
        const tc = {
            id: uuid.v4().toUpperCase(),
            treatment_id: treatmentId,
            customer_id: customer.id,
            createdby: credendial.userId,
            created: moment()
        }
        try {
            return await Treatment_Customer.create(tc);
        } catch (e) {
            throw new TreatmentException('Error on a treatment customer registry.');

        }
    }
    async analyzeCustomer(c, credendial, treatmentId) {
        //verifica se já existe o beneficiario. 
        let customer = await customerService.findbyCpf(c, credendial);
        var numberPattern = /\d+/g;

        if (customer.length === 0) {
            //Se não existir, faça o registro

            /**Elimina outros caraceres do CPF */
            c.cpf = c.cpf.match(numberPattern);
            customer = await customerService.create(c, credendial);
            //await customersIds.push(customer[0].id);
            return await this.treatmentStoreCustomer(c, treatmentId, credendial);
        }
        if (customer.length >= 1) {
            //customer = await customerService.fincreate(c, credendial);
            /**Elimina outros caraceres do CPF */
            customer[0].cpf = c.cpf.match(numberPattern);
            return await this.treatmentStoreCustomer(customer[0], treatmentId, credendial);
        }
        return undefined;
        //Caso exista não atualize. 
    }
    async validaCustomers(customers, credendial, treatmentId) {
        const obj = this;
        await customers.forEach(async function (c) {
            return await obj.analyzeCustomer(c, credendial, treatmentId)
        });
    }

    async store(treatment) {

        return await treatmentModel.create(treatment);//,  });
    }


    async create(request) {

        const credendial = await cache.getCredencial(request);

        const activeUser = credendial.userId;

        let treatment = await JSON.parse(request.body.treatment);







        /**Define variáveis auxiliares */
        //treatment.id = uuid.v4().toUpperCase();
        treatment.createdby = await credendial.userId;
        treatment.created = await moment();
        treatment.partner_Id = await credendial.partnerId;
        treatment.division_Id = await credendial.divisionId;

        /**
         * Registra todos os beneficiários
         */
        const customers = treatment.customers;

        /**
         * Registra todas as tasks
         */
        const tasks = await treatment.actions;
        if (!tasks) {
            //lança erro de task não encontrada
            throw new TreatmentException('Não existe nenhum serviço a se cadastrar.');
        }

        const t = '';
        /**
         * Registra a treatment
         */
        try {
            treatment = await this.store(treatment);
        } catch (e) {
            throw new TreatmentException('Error on a treatment registry.');

        }

        //Array com ID's de beneficiários para registrar no banco de dados

        if (!customers) {
            //lança erro de beneficiários não encontrado
            throw new TreatmentException('Não existe nenhum beneficiário a se registrar.');
        }

        try {
            await this.validaCustomers(customers, credendial, treatment.id);
        } catch (e) {
            throw new TreatmentException('Error on a treatment registry.');

        }


        try {
            tasks.forEach(async function (tsk) {
                tsk.treatment_id = treatment.id;
                const tsks = await taskService.create(tsk, credendial);
            })

        } catch (e) {
            throw new TreatmentException('Error on a treatment registry.');

        }

        /**
         * Recupera dados de produção de leite através do fluxo json e faz o registro
         */
         if(treatment.prodLeite){
            let prodLeite = treatment.prodLeite
            prodLeite.id = treatment.id;
            prodLeite.createdby = await credendial.userId;
            prodLeite.created = await moment();
            prodLeite = await regProducao.regProdLeite(prodLeite);
        }

    }

}
module.exports = TreatmentService;