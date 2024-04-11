
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
        customer.cep = customer.cep? customer.cep.replace('-', '').replace('.',''): '';
        
        /**
         * Converter Array de cpf em string
         */
        customer.cpf = customer.cpf.join();
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

    async findByLike(request) {

        const like = request.params['like'];
        const credendial = await cache.getCredencial(request);

        const query = `
        SELECT 
            id,
            name,
            cpf,
            district,
            city
        FROM customers 
            where 
            customers.partner_id = '${credendial.partnerId}'
            and customers.division_id = '${credendial.divisionId}'
            and customers.name like('%${like}%')
            order by customers.name asc
        `;

        return await CustomerModel.sequelize.query(query, { type: CustomerModel.sequelize.QueryTypes.SELECT });

    }
    async findActions(request) {

        const credendial = await cache.getCredencial(request);
        
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;

        const idprodutor = request.params['idprodutor'];
        console.log(idprodutor);
        
        const query = `
        SELECT 
            customers.name as customername,
            customers.id as customerid,
            customers.cpf as cpf,
            users.name as username,
            emissor.name as emissor_username,
            users.id as userid,
            users.division_id as division,
            users.partner_id as partner,
            tasks.id, tasks.status, 
            tasks.created as taskcreated, 
            treatments.data, 
            tasks.description, 
            tasks.qtd, 
            treatments.pathFileName,
            tasks.userDesigned_id,
            comments.comments as comments,
            comments.created as created,
            crpropostas.id as hasprojectid,
            treatments.id as idvisita
                    
                FROM tasks
                left join treatments on treatments.id= tasks.treatment_id
                left join treatment_customers on treatment_customers.treatment_id = treatments.id
                left join customers on customers.id = treatment_customers.customer_id
                left join users on users.id = tasks.userDesigned_id
                
                
                left join (select comments.* from comments
                right join (SELECT MAX(comments.created) as ultimo, comments.taskid FROM comments GROUP BY comments.taskid) as ultimoregistro
                on comments.taskid = ultimoregistro.taskid and comments.created = ultimoregistro.ultimo) as comments on comments.taskid = tasks.id

                left join crpropostas on crpropostas.id = treatments.id
                left join users as emissor on emissor.id = comments.fromuser
                
                    where 
                    customers.id =  '${idprodutor}'
                    and customers.partner_id = '${credendial.partnerId}'
                    and customers.division_id = '${credendial.divisionId}'
                    group by tasks.id
                    order by treatments.data desc
                ;
            `;

        return await CustomerModel.sequelize.query(query, { type: CustomerModel.sequelize.QueryTypes.SELECT });



    }
    async findByPublic(customer, credendial) {
        return [];
    }
}
module.exports = CustomerService;