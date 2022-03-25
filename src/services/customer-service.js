
require('dotenv').config();
const moment = require('moment');

const uuid = require('uuid');

const CustomerModel = require('../../models/customer');

const { ServerErrorException } = require('../exceptions/server-exception');
const {
    DivisionNotFoundException,
    DivisionErrorException
} = require('../exceptions/division-exception');

const UserCache = require('../core/cache-user');
const cache = new UserCache();


class CustomerService {

    async create(customer, credendial) {

        /**Define variáveis auxiliares */
        customer.id = uuid.v4().toUpperCase();
        customer.partner_id = credendial.partnerId;
        customer.division_id = credendial.divisionId;
        customer.createdby = credendial.userId;

        customer.created = moment();
        customer.expiresDate = moment().add(process.env.CUSTOMER_EXPIRES, 'month');

        //Remove possíveis erros no registro
        /**
         * Corrige caracteres no CEP
         */
        customer.cep = customer.cep.replace('-', '').replace('.','');
        
        /**
         * Correção de espaços em excesso no nome do beneficiário
         */
        customer.name = customer.name.trim();
        
        /**
         * Correção em dados da data de nascimento para registro no banco de dados
         */
        if(customer.birth_date === ''){
            customer.birth_date = undefined;
        }

        try{
            return await CustomerModel.create(customer);
        }catch(e){
            throw new ServerErrorException(e);
        }
    }
    async findCustomer(request){
        const cpf = request.params['cpf'];
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        return await this.findbyCpf({cpf:cpf}, credendial);
    }
    async findbyCpf(customer, credendial) {
        /**
         * Retorna todos os usuários que pertencam a empresa logada
         */
        const c = credendial.role_class;
        /**
         * Caso classe for Administrador da plataforma (8-10)
         */

        if (c > 7)
            return await this.findByAdmin(customer, credendial);

        /**
         * Caso classe for Gestor (6-7)
         */
        if ((c > 5) && (c <= 7))
            return await this.findByPartner(customer, credendial);

        /**
         * Caso classe for Diretor (3-5)
         */
        if ((c > 2) && (c <= 5))
            return await this.findByDivision(customer, credendial);

        /**
         * Caso classe for Funcionario (1-3)
         */
        if ((c > 0) && (c <= 2))
            return await this.findByUser(customer, credendial);

        /**
         * Caso classe for publico (0 )
         */
        return await this.findByPublic(customer, credendial);
    }
    async findByAdmin(customer, credendial) {
        const query = `
        SELECT * FROM customers 
            where 
            and customers.cpf = '${customer.cpf}'
        `;
        return await CustomerModel.sequelize.query(query, { type: CustomerModel.sequelize.QueryTypes.SELECT });
    }
    async findByPartner(customer, credendial) {
        const query = `
        SELECT * FROM customers 
            where 
            customers.partner_id = '${credendial.partnerId}'
            and customers.cpf = '${customer.cpf}'
        `;
        return await CustomerModel.sequelize.query(query, { type: CustomerModel.sequelize.QueryTypes.SELECT });
    }

    async findByDivision(customer, credendial) {
        const query = `
        SELECT * FROM customers 
            where 
            customers.partner_id = '${credendial.partnerId}'
            and customers.division_id = '${credendial.divisionId}'
            and customers.cpf = '${customer.cpf}'
        `;
        return await CustomerModel.sequelize.query(query, { type: CustomerModel.sequelize.QueryTypes.SELECT });
    }

    async findByUser(customer, credendial) {
        const query = `
        SELECT * FROM customers 
            where 
            customers.partner_id = '${credendial.partnerId}'
            and customers.division_id = '${credendial.divisionId}'
            and customers.cpf = '${customer.cpf}'
        `;
        return await CustomerModel.sequelize.query(query, { type: CustomerModel.sequelize.QueryTypes.SELECT });

    }
    async findByPublic(customer, credendial) {
        return [];
    }
}
module.exports = CustomerService;