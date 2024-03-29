require('dotenv').config();

const { Op } = require('sequelize');

const moment = require('moment');
const brcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

const MailService = require('../core/mail-service');
const mailService = new MailService();

const ActionModel = require('../../models/action');
const UserModel = require('../../models/user');
const UserDto = require('../../src/dtos/usuario-dto');

const routeModel = require('../../models/route');


const RoleService = require('../services/role-service');
const roleService = new RoleService();

const PartnerService = require('../services/partner-service');
const partnerService = new PartnerService();

const DivisionService = require('../services/division-service');
const divisionService = new DivisionService();

const ThemeService = require('../services/theme-service');
const themeService = new ThemeService();

const TaskService = require('../services/task-service');
const taskService = new TaskService();

const ProjetcCRService = require('../services/credrural-register-service');
const projetcCRService = new ProjetcCRService();

const TaskModel = require('../../models/task');
const ProjectModel = require('../../models/project');

const credRuralItensFinanciaveis = require('../../models/itensFinanciaveis');

const {
    ServerErrorException,
    NotFoundErrorException
} = require('../exceptions/server-exception');

const {
    UserErrorException,
    UserNotFoundException,
    UserAlreadyException
} = require('../exceptions/user-exception');

const { PartnerNotFoundException } = require('../exceptions/partner-exception');

const Token = require('../dtos/token');
const DivisionDto = require('../dtos/division-dto');

require('dotenv').config();

class UserService {

    ADMINISTRADOR_PORTAL = 8;
    GESTOR_CONTRATO = 7;
    DIRETOR_DIVISAO = 4;
    FUNCIONARIO = 2;
    ACESSO_PUBLICO = 1;

    constructor() { }
    async storage(user) {

        const passwordOrigin = user.password;

        /**Codifica o password */
        const salt = process.env.BRCRYPT_SECRET;
        const passHashed = await brcrypt.hash(user.password, salt);
        user.password = passHashed;

        /**
         * Confere se existe o ID da permissão no banco de dados e configura caso exista.
         */
        const role = await this._checkRole(user.role_id);
        user.role_id = role;

        try {
            await UserModel.create(user);
        } catch (e) {
            throw new ServerErrorException(e.message);
        }

        const usuario = await UserModel.findByPk(user.id);


        let dto = await new UserDto(usuario)
        dto.obj.password = passwordOrigin;

        /** Envia email para o usuario informando o registro e o password */
        await this.sendMail(dto.obj);

        /**Oculta o password */
        dto.obj.password = '***';

        return dto.obj;

    }
    async addItemOnProject(request) {

        const credendial = await cache.getCredencial(request);

        let item = request.body;

        item.createdby = credendial.userId;
        item.created = moment();
        const addRow = await projetcCRService.regItem(item, item.idproposta);

        return addRow;
    }

    async riskItemOnProject(request) {

        const credendial = await cache.getCredencial(request);
        const toRisked = request.body.toRisked;
        const addRow = await projetcCRService.riskItemOnProject(request.params.id, credendial, toRisked);

        return addRow;
    }

    async quitArtOnProject(request) {

        const credendial = await cache.getCredencial(request);

        const valor = request.body?.valor ? request.body?.valor : null;

        const addRow = await projetcCRService.quitArtOnProject(request.params.id, valor, credendial);

        return addRow;
    }
    async quitDaeOnProject(request) {

        const credendial = await cache.getCredencial(request);
        const valor = request.body?.valor ? request.body?.valor : null;

        const addRow = await projetcCRService.quitDaeOnProject(request.params.id, valor, credendial);
        return addRow;
    }
    async addtaskOnTreatment(request) {

        const credendial = await cache.getCredencial(request);

        let task = request.body;
        const addRow = await taskService.create(task, credendial);
        return addRow;

    }
    async recoverypassword(req) {
        const registry = req.params['registry'];
        const newpassword = req.params['password'];

        /**Codifica o password */
        const salt = process.env.BRCRYPT_SECRET;
        const password = await brcrypt.hash(newpassword, salt);

        const updatedpass = await UserModel.update({ password }, { where: { registry } })
        return updatedpass
    }

    async finalizeTasks(request, id) {

        const statusReq = 'FINALIZADA';

        const credendial = await cache.getCredencial(request);

        /**
         * Diretores não  informam dados de departamento ou empresa
         * O ID da empresa  e da divisão já são configurados de acordo com a empresa e departamento na qual o usuraio pertence
         */
        request.body.partner_id = credendial.partnerId;
        request.body.division_id = credendial.divisionId;


        const updatedRows = await TaskModel.update(
            {
                status: `${statusReq}`,
            },
            {
                where: { id },
            }
        );

    }
    async cancelTasks(request, id) {

        const statusReq = 'CANCELADA';

        const credendial = await cache.getCredencial(request);

        /**
         * Diretores não  informam dados de departamento ou empresa
         * O ID da empresa  e da divisão já são configurados de acordo com a empresa e departamento na qual o usuraio pertence
         */
        request.body.partner_id = credendial.partnerId;
        request.body.division_id = credendial.divisionId;


        const updatedRows = await TaskModel.update(
            {
                status: `${statusReq}`,
            },
            {
                where: { id },
            }
        );

    }
    async expireTasks(request, id) {

        const statusReq = 'EXPIRADA';

        const credendial = await cache.getCredencial(request);

        /**
         * Diretores não  informam dados de departamento ou empresa
         * O ID da empresa  e da divisão já são configurados de acordo com a empresa e departamento na qual o usuraio pertence
         */
        request.body.partner_id = credendial.partnerId;
        request.body.division_id = credendial.divisionId;


        const updatedRows = await TaskModel.update(
            {
                status: `${statusReq}`,
            },
            {
                where: { id },
            }
        );

    }
    async countProjectsGestor(data) {
        const query = `
            select * from projects
            where
            lockedDate is null 
            and partner_id='${data.partner_id}'
            and year(created)=${data.ano}
            order by created desc
                ;
        `;
        const projects = await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });

        return projects;
    }
    async countProjectsDiretor(data) {
        const query = `
            select * from projects
            where
            lockedDate is null 
            and partner_id='${data.partner_id}'
            and division_id = '${data.division_id}'
            and year(created)=${data.ano}
            order by created desc
                ;
        `;
        const projects = await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });

        return projects;
    }

    async countProjectsFuncionario(data) {
        return await this.countProjectsDiretor(data);
    }
    async allTreatmentsByDateGestor(data) {
        const query = `
        select 
        treatments.id as treatment_id, tasks.id as task_id,  treatments.data, customers.name as customer, customers.cpf as cpf, treatments.local, tasks.description, tasks.qtd, tasks.valor, users.name as user, tasks.status
        from tasks
        inner join actions on tasks.action_id = actions.id
        inner join projects on actions.project_id = projects.id
        left join treatments on treatments.id = tasks.treatment_id
        left join treatment_customers on treatment_customers.treatment_id = treatments.id
        left join customers on treatment_customers.customer_id = customers.id
        left join users on users.id = tasks.userDesigned_id
                where
                projects.partner_id='${data.partner_id}'
                and (treatments.data between date('${data.dtInicial}') and date('${data.dtFinal}'))
                order by treatments.data desc;
        `;
        const treatments = await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });

        return treatments;
    }
    async allTreatmentsByDateDiretor(data) {
        const query = `
        select 
        treatments.id as treatment_id, tasks.id as task_id,  treatments.data, customers.name as customer, customers.cpf as cpf, treatments.local, tasks.description, tasks.qtd, tasks.valor, users.name as user, tasks.status
        from tasks
        inner join actions on tasks.action_id = actions.id
        inner join projects on actions.project_id = projects.id
        left join treatments on treatments.id = tasks.treatment_id
        left join treatment_customers on treatment_customers.treatment_id = treatments.id
        left join customers on treatment_customers.customer_id = customers.id
        left join users on users.id = tasks.userDesigned_id
                where
                projects.partner_id='${data.partner_id}'
                and projects.division_id='${data.division_id}'
                and (treatments.data between date('${data.dtInicial}') and date('${data.dtFinal}'))
                order by treatments.data desc;
        `;
        const treatments = await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });

        return treatments;
    }
    async allTreatmentsByDateFuncionario(data) {
        return await this.allTreatmentsByDateDiretor(data);
    }
    async allTreatmentsByDate(request) {

        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;

        /**Define o ano atual */
        const dtInicial = moment(request.params['inicial']).utc().format('yyyy-MM-DD');
        const dtFinal = moment(request.params['final']).utc().format('yyyy-MM-DD');

        const data = {
            partner_id, division_id, userId, dtInicial, dtFinal
        }

        console.log(data);
        if (role_class >= this.ADMINISTRADOR_PORTAL) {
            return {};
        }
        if (role_class >= this.GESTOR_CONTRATO) {
            return this.allTreatmentsByDateGestor(data);
        }
        if (role_class >= this.DIRETOR_DIVISAO) {
            return this.allTreatmentsByDateDiretor(data);
        }
        if (role_class >= this.FUNCIONARIO) {
            return this.allTreatmentsByDateFuncionario(data);
        }
        if (role_class >= this.ACESSO_PUBLICO) {
            return {};
        }
    }

    async allCustomers(request) {
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;

        /**Define o ano atual */
        const ano = moment().utc().format('yyyy');

        const data = {
            partner_id, division_id, userId, ano
        }

        if (role_class >= this.ADMINISTRADOR_PORTAL) {
            return {};
        }
        if (role_class >= this.GESTOR_CONTRATO) {
            return this.allCustomersGestor(data);
        }
        if (role_class >= this.DIRETOR_DIVISAO) {
            return this.allCustomersDiretor(data);
        }
        if (role_class >= this.FUNCIONARIO) {
            return this.allCustomersFuncionario(data);
        }
        if (role_class >= this.ACESSO_PUBLICO) {
            return {};
        }
    }
    async allTreatments(request) {
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;

        /**Define o ano atual */
        const ano = moment().utc().format('yyyy');

        const data = {
            partner_id, division_id, userId, ano
        }

        if (role_class >= this.ADMINISTRADOR_PORTAL) {
            return {};
        }
        if (role_class >= this.GESTOR_CONTRATO) {
            return this.allTreatmensGestor(data);
        }
        if (role_class >= this.DIRETOR_DIVISAO) {
            return this.allTreatmensDiretor(data);
        }
        if (role_class >= this.FUNCIONARIO) {
            return this.allTreatmensFuncionario(data);
        }
        if (role_class >= this.ACESSO_PUBLICO) {
            return {};
        }
    }
    async allCustomersGestor(data) {
        const query = `
            select 
            customers.name as beneficiario,
            count(treatments.id) as atendimentos,
            customers.id
            from tasks
            left join actions on tasks.action_id = actions.id
            left join projects on actions.project_id = projects.id
            left join treatments on treatments.id = tasks.treatment_id
            left join treatment_customers on treatment_customers.treatment_id = treatments.id
            left join customers on treatment_customers.customer_id = customers.id
            where
                tasks.status='FINALIZADA'
                AND projects.partner_id='${data.partner_id}'
                and year(treatments.data) = ${data.ano}
                group by treatments.id
        ;
        `;
        const treatments = await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });

        return treatments;
    }
    async allCustomersDiretor(data) {
        const query = `
            select 
            customers.name as beneficiario,
            count(treatments.id) as atendimentos,
            customers.id
            from tasks
            left join actions on tasks.action_id = actions.id
            left join projects on actions.project_id = projects.id
            left join treatments on treatments.id = tasks.treatment_id
            left join treatment_customers on treatment_customers.treatment_id = treatments.id
            left join customers on treatment_customers.customer_id = customers.id
            where
                tasks.status='FINALIZADA'
                AND projects.partner_id='${data.partner_id}'
                AND projects.division_id='${data.division_id}'
                and year(treatments.data) = ${data.ano}
                group by treatments.id
        ;
        `;
        const treatments = await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });

        return treatments;
    }
    async allCustomersFuncionario(data) {
        return await this.allCustomersDiretor(data);
    }
    async allTreatmensGestor(data) {
        const query = `
            select 
            count(*) as atendimentos
            from tasks
            inner join actions on tasks.action_id = actions.id
            inner join projects on actions.project_id = projects.id
            left join treatments on treatments.id = tasks.treatment_id
            left join treatment_customers on treatment_customers.treatment_id = treatments.id
            left join customers on treatment_customers.customer_id = customers.id
            where
            tasks.status='FINALIZADA'
            AND projects.partner_id='${data.partner_id}'
            and year(treatments.data) = ${data.ano}
        ;
        `;
        const treatments = await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });

        return treatments[0];
    }
    async allTreatmensDiretor(data) {
        const query = `
            select 
            count(*) as atendimentos
            from tasks
            inner join actions on tasks.action_id = actions.id
            inner join projects on actions.project_id = projects.id
            left join treatments on treatments.id = tasks.treatment_id
            left join treatment_customers on treatment_customers.treatment_id = treatments.id
            left join customers on treatment_customers.customer_id = customers.id
            where
            tasks.status='FINALIZADA'
            AND projects.partner_id='${data.partner_id}'
            and projects.division_id='${data.division_id}'
            and year(treatments.data) = ${data.ano}
        ;
        `;
        const treatments = await ProjectModel.sequelize.query(query, { type: ProjectModel.sequelize.QueryTypes.SELECT });

        return treatments[0];
    }
    async allTreatmensFuncionario(data) {
        return this.allTreatmensDiretor(data);

    }
    async countProjects(request) {

        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;

        /**Define o ano atual */
        const ano = moment().utc().format('yyyy');

        const data = {
            partner_id, division_id, userId, ano
        }

        if (role_class >= this.ADMINISTRADOR_PORTAL) {
            return {};
        }
        if (role_class >= this.GESTOR_CONTRATO) {
            return this.countProjectsGestor(data);
        }
        if (role_class >= this.DIRETOR_DIVISAO) {
            return this.countProjectsDiretor(data);
        }
        if (role_class >= this.FUNCIONARIO) {
            return this.countProjectsFuncionario(data);
        }
        if (role_class >= this.ACESSO_PUBLICO) {
            return {};
        }

    }

    async projectsCrByTreatment(id) {

        const query = `
            SELECT 
                treatments.id as visitaId,
                treatments.local as local,
                treatments.data as data,
                crpropostas.id as idproposta,
                crpropostas.banco as banco,
                crpropostas.linha as linha,
                crpropostas.rdaok as pgmrda,
                crpropostas.trtok as pgmtrt,
                crpropostas.rda as valorrda,
                crpropostas.trt as valortrt,
                crpropostas.obs as observacoes,
                itensfinanciados.id as iditemfinanciado,
                itensfinanciados.descricao as descricao,
                itensfinanciados.unidade as unidade,
                itensfinanciados.qtditemfinanc as qtditemfinanc,
                itensfinanciados.valorunit as valorunit,
                itensfinanciados.risked as risked,
                ( qtditemfinanc * valorunit) as valorTotalItem
            FROM smart.itensfinanciados
                left join crpropostas on itensfinanciados.idproposta = crpropostas.id
                left join treatments on crpropostas.id = treatments.id

                WHERE
                    treatments.id = '${id}'
                ;
        `;

        const response = await ActionModel.sequelize.query(query, { type: ActionModel.sequelize.QueryTypes.SELECT });
        return response;

    }
    async customerByTreatment(id) {

        const query = `
            SELECT 
                customers.name as nome,
                customers.cpf as cpf

            from customers
                left join treatment_customers on treatment_customers.customer_id = customers.id
                left join treatments on treatments.id = treatment_customers.treatment_id

            WHERE
                treatments.id = '${id}'
                ;
        `;

        const response = await ActionModel.sequelize.query(query, { type: ActionModel.sequelize.QueryTypes.SELECT });
        return response;
    }
    async tasksByTreatment(id) {

        const query = `
        SELECT 
            treatments.data as dataVisita, 
            treatments.id as visitaId,
            treatments.local as local,
            treatments.data as data,
            tasks.id as taskId,
            tasks.description as description, 
            tasks.qtd as qtd, 
            tasks.valor as valor, 
            tasks.status as status, 
            users.name as user 
            FROM tasks
                left join treatments on treatments.id = tasks.treatment_id
                left join users on users.id = tasks.userDesigned_id
            WHERE
                tasks.treatment_id = '${id}'
            ;
        `;

        const response = await ActionModel.sequelize.query(query, { type: ActionModel.sequelize.QueryTypes.SELECT });

        return response;

    }
    async restartTasks(request, id) {

        const statusReq = 'INICIADA';

        const credendial = await cache.getCredencial(request);

        /**
         * Diretores não  informam dados de departamento ou empresa
         * O ID da empresa  e da divisão já são configurados de acordo com a empresa e departamento na qual o usuraio pertence
         */
        request.body.partner_id = credendial.partnerId;
        request.body.division_id = credendial.divisionId;


        const updatedRows = await TaskModel.update(
            {
                status: `${statusReq}`,
            },
            {
                where: { id },
            }
        );

    }
    async finalizeTasks(request, id) {

        const statusReq = 'FINALIZADA';

        const credendial = await cache.getCredencial(request);

        /**
         * Diretores não  informam dados de departamento ou empresa
         * O ID da empresa  e da divisão já são configurados de acordo com a empresa e departamento na qual o usuraio pertence
         */
        request.body.partner_id = credendial.partnerId;
        request.body.division_id = credendial.divisionId;


        const updatedRows = await TaskModel.update(
            {
                status: `${statusReq}`,
            },
            {
                where: { id },
            }
        );

    }
    async sendMail(obj) {
        await mailService.send({
            to: obj.email,
            subject: `Cadastro de usuário na plataforma JP-Ares`,
            text: `Você foi registrado na plataforma JP-AREs, nosso portal de gestão e acompanhamento de projetos. Segue abaixo os dados para acesso`,
            html: `
            <h1>Olá <strong>${obj.name},</strong></h1>
            <h3 style="color: black">
            <p>Você acaba de ser registrado na plataforma JP-AREs, nosso portal de gestão e acompanhamento de projetos. Segue abaixo os dados para acesso:</p>
            <p><strong>Seu login:</strong> ${obj.registry}</p>
            <p><strong>Sua senha provisória:</strong> ${obj.password}</p>
            <br>
            <p>clique neste link para acessar o portal: http://www.connect-ares.com.br</p>
            <p>"${process.env.TEXT_LGPG}"</p>
            <br>
            <p>Atenciosamente,</p>
            <strong> 
            <p>${process.env.DESENVOLVEDOR_NAME}</p>
            <p>${process.env.DESENVOLVEDOR_COMPANY}</p>
            </strong>
            </h3>
            `
        });
        return true;
    }

    async createByAdmin(request) {

        const credendial = await cache.getCredencial(request);
        const data = request.body;
        /**
         * Administradores do prtal informam a empresa e o Departamento/Divisão
         */
        const partner_exists = partnerService.exists(data.partner_id);
        /**
         * Verifica se já existe a empresa informada
         //Exite a empresa?
         */
        if (!partner_exists) {
            throw new PartnerNotFoundException(`Não existe a empresa informada.`)
        }

        const division_exists = await divisionService.exists(data.division_id);
        /**
         * Verifica se já existe o departamento informado
         //Exite a Departamento/Divisão?
         */
        if (!division_exists) {
            throw new NotFoundErrorException(`Não existe esta Divisão/Departamento informado.`)
        }

        return await this._create(request);

    }
    async createByPartner(request) {

        const credendial = await cache.getCredencial(request);
        const data = request.body;

        /**
         * Gestores somente informam o Departamento/Divisão
         * O ID da empresa já é configurado de acordo com a empresa na qual o gestor pertence
         */
        data.partner_id = credendial.partnerId;

        const division_exists = await divisionService.exists(data.division_id);
        /**
         * Verifica se já existe o departamento informado
         //Exite a Departamento/Divisão?
         */
        if (!division_exists) {
            throw new NotFoundErrorException(`Não existe esta Divisão/Departamento informado.`)
        }

        return await this._create(request);

    }
    async createByDivision(request) {

        const credendial = await cache.getCredencial(request);

        /**
         * Diretores não  informam dados de departamento ou empresa
         * O ID da empresa  e da divisão já são configurados de acordo com a empresa e departamento na qual o usuraio pertence
         */
        request.body.partner_id = credendial.partnerId;
        request.body.division_id = credendial.divisionId;

        return await this._create(request);

    }
    async createByUser(request) {

        const credendial = await cache.getCredencial(request);
        /**
         * Usuários, Diretores  não  informam dados de departamento ou empresa
         * O ID da empresa  e da divisão já são configurados de acordo com a empresa e departamento na qual o usuraio pertence
         */
        request.body.partner_id = credendial.partnerId;
        request.body.division_id = credendial.divisionId;

        return await this._create(request);

    }
    /**
     * Avalia o token e direciona a ação de cordo com a permissão do usuário
     * 
     * @param {object} request 
     * @returns 
     */
    async save(request) {

        const credendial = await cache.getCredencial(request);
        const c = credendial.role_class;

        if (c > 7)
            return await this.createByAdmin(request);

        if ((c > 5) && (c <= 7))
            return await this.createByPartner(request);

        if ((c > 2) && (c <= 5))
            return await this.createByDivision(request);

        if ((c > 0) && (c <= 2))
            return await this.createByUser(request);
    }

    async regroute(request) {

        const credendial = await cache.getCredencial(request);

        const route = {};
        route.route = (request.body['route']);

        route.id = uuid.v4().toUpperCase();
        route.createdby = credendial.userId;
        route.created = moment().utc();

        try {
            return await routeModel.create(route);
        } catch (e) {
            throw new ServerErrorException(e.message);
        }

    }
    async _create(request) {

        const credendial = await cache.getCredencial(request);

        const user = request.body;
        user.expiresDate = moment().utc().add(1, 'months');

        user.id = uuid.v4().toUpperCase();
        user.createdby = credendial.userId;

        /**
         * Verifica se já existe este usuário nos registros
         //Exite o usuário?
         */
        const user_exists = await this.exists(user.registry);

        if (user_exists) {
            throw new UserAlreadyException(`O registro de usuário: ${user.registry} já existe no banco de dados.`)
        }
        /**
         * Defineum password aleatório para o usuários
         */

        user.password = await cache.generatehashPassword();

        return this.storage(user);
    }

    async extend(request, id) {

        /**
         * Obtem os dados do usuário ativo
         */
        const credendial = await cache.getCredencial(request);
        const updatedby = credendial.userId;
        /**
        * Recupera o ID do usuário para verificar se existe e também uma possível
        * manipulação das informações caso seja necessário.
        */
        const user = await this.findById(id);
        if (!user) {
            throw new UserNotFoundException(`Usuário com ID: ${id} não foi encontrado.`);
        }

        /**
        * Atualiza o banco de dados, somente  expiresDate e updatedby
        */
        let expiresDate = user.expiresDate;

        // expiresDate = moment(user.expiresDate).utc().add(process.env.USER_EXPIRES_EXTEND, 'days');
        expiresDate = moment().utc().add(process.env.USER_EXPIRES_EXTEND, 'days');
        /*
        if (!expiresDate) {
            expiresDate = moment(user.expiresDate).utc().add(process.env.USER_EXPIRES_EXTEND, 'days');
        } else {
            expiresDate = null;
        }*/
        await UserModel.update({ expiresDate, updatedby }, { where: { id } });
    }

    async taksUpdateValor(request, id) {

        /**
         * Obtem os dados do usuário ativo
         */
        const credendial = await cache.getCredencial(request);
        const updatedby = credendial.userId;
        /**
        * Recupera o ID do usuário para verificar se existe e também uma possível
        * manipulação das informações caso seja necessário.
        */
        const user = await this.findById(id);

        if (!user) {
            throw new UserNotFoundException(`Usuário com ID: ${id} não foi encontrado.`);
        }

        // TODO: Ajustar a definição desta variável
        const valor = req.body.valor;

        await TaskModel.update({ valor, updatedby }, { where: { id } });
    }
    async toggleLock(request, id) {

        /**
         * Obtem os dados do usuário ativo
         */
        const credendial = await cache.getCredencial(request);
        const updatedby = credendial.userId;
        /**
        * Recupera o ID do usuário para verificar se existe e também uma possível
        * manipulação das informações caso seja necessário.
        */
        const user = await this.findById(id);
        if (!user) {
            throw new UserNotFoundException(`Usuário com ID: ${id} não foi encontrado.`);
        }

        /**
        * Atualiza o banco de dados, somente  lockedDate e updatedby
        */
        let lockedDate = user.lockedDate;

        if (!lockedDate) {
            lockedDate = moment().utc();
        } else {
            lockedDate = null;
        }
        await UserModel.update({ lockedDate, updatedby }, { where: { id } });
    }

    async update(request, id) {
        const credencial = await cache.getCredencial(request);

        /**
        * Recupera o ID do usuário para verificar se existe e também uma possível
        * manipulação das informações caso seja necessário.
        */
        const user = await this.findById(id);
        if (!user) {

            throw new UserNotFoundException(`Usuário com ID: ${id} não foi encontrado.`);
        }
        /**
        * Atualiza o banco de dados, somente a senha
        */
        const dataUpdated = request.body;

        return await UserModel.update({
            name: dataUpdated.name,
            registry: dataUpdated.registry,
            email: dataUpdated.email,
            address: dataUpdated.address,
            num: dataUpdated.num,
            district: dataUpdated.district,
            complement: dataUpdated.complement,
            cep: dataUpdated.cep,
            phone: dataUpdated.phone,
            city: dataUpdated.city,
            uf: dataUpdated.uf,
            role_id: dataUpdated.role_id,
            division_id: dataUpdated.division_id,
            updatedby: credencial.userId,
            updated: moment().utc()
        }, { where: { id } });

    }
    async recovery(request, id) {
        /**
         * Recupera o ID do usuário para verificar se existe e também uma possível
         * manipulação das informações caso seja necessário.
         */
        const user = await this.findById(id);
        if (!user) {

            throw new UserNotFoundException(`Usuário com ID: ${id} não foi encontrado.`);
        }

        /**
         * Gera nova senha
         */
        const novaSenha = await cache.generatehashPassword();

        /**
         * Atualiza o banco de dados, somente a senha
         */
        await UserModel.update({ password: novaSenha }, { where: { id } });

        /**
         * Envia o email
         */
        /**
         * Grava a senha temporária "aberta" no objeto que será enviado por email
         * para utilização do usuário que deverá modificá-la o mais breve possível.
         */
        user.password = novaSenha;
        return await this.sendMail(user);


    }
    async findById(id) {
        return await UserModel.findByPk(id);
    }

    /**
     * Retorna a lista de todos os usuários da plataforma
     * @param {reques} request 
     * @returns 
     */
    async findByAdmin(request) {

        const name = req.params['name'];
        const credendial = await cache.getCredencial(request);

        return await UserModel.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                },
                [Op.and]: {
                    lockedDate: null
                }
            }
        });
    }

    /**
     * Retorna a lista de todos os usuários da Empresa parceira
     * @param {reques} request 
     * @returns 
     */
    async findByPartner(request) {

        const name = request.params['name'];
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;

        return await UserModel.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                },
                [Op.and]: {
                    partner_id
                },
                [Op.and]: {
                    lockedDate: null
                }
            }
        });
    }
    /**
     * Retorna a lista de todos os usuários do Departamento que não estejam bloqueados para acesso
     * @param {reques} request 
     * @returns 
     */
    async findByDivision(request) {

        const name = request.params['name'];
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;

        const query = `
        SELECT
            users.id, users.name, users.registry, users.email, users.role_id, users.partner_id, users.division_id, users.password, users.address, users.num, users.district, users.complement, users.cep, users.phone, users.city, users.uf, users.expiresDate, users.lockedDate, users.createdby, users.updatedby, users.created, users.updated
            FROM users
                left join roles
                on users.role_id = roles.id
                where 
                (roles.class < ${role_class} or users.id = '${userId}')
                and users.division_id = '${division_id}'
                and users.partner_id = '${partner_id}'
                and users.lockedDate is null
                and users.expiresDate > now()
                and users.name like('%${name}%')
                ;
        `;
        const users = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });

        return users;
    }
    async countMyActions(request) {

        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;

        const query = `
        SELECT count(*) as tasks FROM tasks
                where 
                tasks.userDesigned_id = '${userId}'
                and tasks.status = 'INICIADA'
                ;
        `;
        const tasks = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });

        return tasks[0];
    }

    async managerRoutes(request) {
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;

        const query = `
        SELECT 
            routes.id,
            routes.route,
            routes.created,
            users.name
        FROM smart.routes
        
        left join users on routes.createdby = users.id
        
        where 
            routes.createdby is not null
        
            order by routes.created desc
        ;
            `;

        const tasks = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });
        return tasks;
    }
    async myProjectsWithActions(request) {
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;

        const query = `
        SELECT 
            actions.id as acaoId,
            actions.description as acaoDescricao,
            actions.qtdAtendimentos as acaoPrevisaoDeAtendimentos,
            actions.valorPorAtendimento as acaoValorPorAtendimento,
            actions.start as acaoDataInicial,
            actions.end as acaoDataConclusao,
            projects.id as projetoId,
            projects.description as projetoDescricao,
            projects.resultado as projetoResultadoEsperado,
            projects.objetivo as projetoObjetivo,
            users.name as responsavel
            FROM smart.actions
            left join projects on projects.id = actions.project_id
            left join users on projects.representative_id = users.id
                
        WHERE
            actions.start <= NOW()
            and actions.end >= NOW()

            and projects.division_id =  '${division_id}'

        group by actions.id
        order by atendimentos desc
                ;
            `;

        const tasks = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });
        return tasks;
    }
    async acompMyProjects(request) {
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;

        const query = `
        SELECT 
        actions.description,
        count(*) as atendimentos,
        actions.id as actionId,
        actions.qtdAtendimentos as actionsAtdPrevisto,
        (count(*)-actions.qtdAtendimentos) as atendimentosXexecutado,
        (actions.valorPorAtendimento * actions.qtdAtendimentos) as actionsValorPrevisto,
        (actions.valorPorAtendimento * count(*)) as actionsValorExecutado,
        projects.id as projectId,
        projects.description
        
        FROM smart.tasks
            inner join actions on actions.id = tasks.action_id
            left join projects on actions.project_id = projects.id
                
        where 
                    tasks.status='FINALIZADA'
                    and actions.start <= NOW()
                    and actions.end >= NOW() 

                    and projects.division_id =  '${division_id}'

                    group by actions.id
                    order by atendimentos desc
                ;
            `;
        // wGltz6I2

        const tasks = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });
        return tasks;
    }

    async addProject(request) {
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;


        let prj = request.body;

        prj.createdby = credendial.userId;
        prj.created = moment();

        const addRow = await projetcCRService.regCredRural(prj, prj.id);

        return addRow;

    }

    async listItensOfProjectsById(id) {

        const query = `
        SELECT
            itensfinanciados.qtditemfinanc as quantidade, 
            itensfinanciados.valorunit as valor,
            itensfinanciados.descricao as item
       FROM itensfinanciados
     
       WHERE 
            itensfinanciados.idproposta = '${id}'
            and itensfinanciados.risked is null

            ;
        `;

        const itens = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });
        return itens;

    }

    async listProjectsByDivision(id) {
        const query = `
            SELECT
                concat(itensfinanciados.descricao, ' (', itensfinanciados.qtditemfinanc, ' ' , itensfinanciados.unidade, ')') as itemfinanciado,
                crpropostas.id as idvisita,
                crpropostas.trtok as trtok,
                crpropostas.rdaok as rdaok,
                treatments.data as data,
                treatments.local as local,
                users.name as usuario,
                customers.name as customername,
                customers.cpf as cpf,
                ST_Y(treatments.point) as longitude,
                ST_X(treatments.point) as latitude

                FROM itensfinanciados
                    left join crpropostas on itensfinanciados.idproposta = crpropostas.id
                    left join treatments on treatments.id = crpropostas.id
                    left join users on crpropostas.createdby = users.id
                    left join treatment_customers on treatment_customers.treatment_id = treatments.id
                    left join customers on customers.id = treatment_customers.customer_id

                WHERE
                    users.division_id =  '${id}'
                    and (Year(treatments.data) = Year(now()) or ((trtok is null) or (rdaok is null)))
                    and itensfinanciados.risked is null

                ORDER BY treatments.data DESC
                ;
                    `;

        const projects = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });
        return projects;

    }

    async findMyProjectsonListDetails(request) {
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;


        //obter od dados de todos os projetos

        const projects = await this.listProjectsByDivision(division_id);


        return projects;

    }


    async findMyProjects(request) {
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;

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
            crpropostas.trtok as trtok,
            crpropostas.rdaok as rdaok,
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

                    crpropostas.id is not null
                    and users.division_id =  '${division_id}'

                    group by treatments.id
                    order by treatments.data desc
                ;
            `;
        // wGltz6I2

        const tasks = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });
        return tasks;


    }
    async findMyActions(request) {
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;
        const role_class = credendial.role_class;
        const userId = credendial.userId;

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
                    tasks.status = 'INICIADA'
                    and users.id =  '${userId}'

                    group by tasks.id
                    order by treatments.data desc
                ;
            `;
        // wGltz6I2

        const tasks = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });
        return tasks;


    }

    /**
     * Retorna a lista de todos os usuários do Departamento
     * @param {reques} request 
     * @returns 
     */
    async findByFunc(request) {
        const name = request.params['name'];
        const credendial = await cache.getCredencial(request);
        const partner_id = credendial.partnerId;
        const division_id = credendial.divisionId;

        const query = `
        SELECT
            users.id, users.name, users.registry, users.email, users.role_id, users.partner_id, users.division_id, users.password, users.address, users.num, users.district, users.complement, users.cep, users.phone, users.city, users.uf, users.expiresDate, users.lockedDate, users.createdby, users.updatedby, users.created, users.updated
            FROM users
                left join roles
                on users.role_id = roles.id
                where 
                roles.class <= 5
                and users.division_id = '${division_id}'
                and users.partner_id = '${partner_id}'
                and users.lockedDate is null
                and users.expiresDate > now()
                and users.name like('%${name}%')
                ;
        `;
        const users = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });

        return users;
    }
    /**
     * Retorna a lista de todos os usuários do Departamento
     * @param {reques} request 
     * @returns 
     */
    async findByUser(request) {
        return await this.findByDivision(request);
    }
    /**
     * No momento não há utilidade, portanto retorna uma lista vazia.
     * @param {reques} request 
     * @returns 
     */
    async findByPublic(request) {
        return {};
    }

    async findByFuncionario(request) {
        /**
         * Retorna todos os usuários que pertencam a empresa logada
         */
        const credendial = await cache.getCredencial(request);
        const c = credendial.role_class;
        /**
         * Caso classe for Administrador da plataforma (8-10)
         */

        if (c > 7)
            return await this.findByAdmin(request);

        /**
         * Caso classe for Gestor (6-7)
         */
        if ((c > 5) && (c <= 7))
            return await this.findByPartner(request);

        /**
         * Caso classe for Diretor (3-5)
         */
        if ((c > 2) && (c <= 5))
            return await this.findByDivision(request);

        /**
         * Caso classe for Funcionario (1-3)
         */
        if ((c > 0) && (c <= 2))
            //return await this.findByUser(request);
            return await this.findByFunc(request);

        /**
         * Caso classe for publico (0 )
         */
        return await this.findByPublic(request);

    }
    async findByItensDescription(request) {

        const query = `
        SELECT * FROM itensfinanciaveis 
        WHERE 
        descricao like('%${request.params.description}%')
        `;

        const response = await credRuralItensFinanciaveis.sequelize.query(query);

        return response[0];
    }

    async findByName(request) {
        /**
         * Retorna todos os usuários que pertencam a empresa logada
         */
        const credendial = await cache.getCredencial(request);
        const c = credendial.role_class;
        /**
         * Caso classe for Administrador da plataforma (8-10)
         */

        if (c > 7)
            return await this.findByAdmin(request);

        /**
         * Caso classe for Gestor (6-7)
         */
        if ((c > 5) && (c <= 7))
            return await this.findByPartner(request);

        /**
         * Caso classe for Diretor (3-5)
         */
        if ((c > 2) && (c <= 5))
            return await this.findByDivision(request);

        /**
         * Caso classe for Funcionario (1-3)
         */
        if ((c > 0) && (c <= 2))
            return await this.findByUser(request);

        /**
         * Caso classe for publico (0 )
         */
        return await this.findByPublic(request);

    }
    async findall(request) {

        const fields = `users.id, users.name, users.registry, users.email, users.role_id, users.partner_id, users.division_id, users.password, users.address, users.num, users.district, users.complement, users.cep, users.phone, users.city, users.uf, users.expiresDate, users.lockedDate, users.createdby, users.updatedby, users.created, users.updated`;
        const credencial = await cache.getCredencial(request);

        const partner_id = credencial.partnerId;
        const division_id = credencial.divisionId;
        const role_class = credencial.role_class;
        const id = credencial.userId;

        //Se classe >8, retorna todos
        if (role_class > 8) {
            const query = `
            SELECT ${fields} FROM users 
                left join roles 
            `;
            const users = await UserModel.sequelize.query(query);
            return users;
        }
        //Se classe >5 e <8 retorn os usuarios da empresa
        if ((role_class >= 5) && (role_class <= 8)) {
            const query = `
            SELECT ${fields} FROM users 
                left join roles 
                on roles.id = users.role_id
                where roles.class<${role_class} 
                and users.partner_id = '${partner_id}'
            `;
            const users = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });

            return users;
        }
        //Se classe <5 e maio que 2 os usuario do departamento
        if ((role_class > 2) && (role_class < 5)) {

            const query = `
            SELECT 
             ${fields} 
            FROM users 
                left join roles 
                on users.role_id = roles.id
                where roles.class<${role_class} 
                and users.division_id='${division_id}'
                and users.partner_id = '${partner_id}'
            `
                ;
            const users = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });

            return users;
        }
        //Se classe <2 somente o proprie registro
        if (role_class <= 2) {
            return await UserModel.findAll({
                where: {
                    id
                }
            });

        }

        try {

            const users = await UserModel.findAll({
                where: {
                    partner_id
                }
            });

            let dto = [];
            users.map(async function (user) {
                dto.push(await new UserDto(user).obj);
            });

            return dto;

        } catch (e) {
            throw new ServerErrorException('Não há registros no banco de dados.');
        }
    }
    async exists(registry) {
        try {
            return await UserModel.findOne({ where: { registry } }) ? true : false;
        } catch (e) {
            return false;
        }
    }
    async login(user) {

        const registry = user.login
        const password = user.password;


        //Rotina de verificações do usuário
        let usuario = await UserModel.findOne({
            where: {
                registry
            }
        });

        //Verifica se a senha é válida

        /*
        const modelo = {usuario.password, password};
        const modelo = usuario;

        console.log('#########################################');
        console.log('Recuperação de senha');
        const salt = process.env.BRCRYPT_SECRET;
        const passHashed = await brcrypt.hash('jacare', salt);
        user.password = passHashed; 
        console.log(passHashed);
        */

        if (!usuario) {
            throw new UserErrorException('Usuários/Senha não existe ou está incorreto.')
        }


        if (!(await this._passworValid(password, usuario.password))) {
            throw new UserErrorException('Usuários/Senha incorreta.')
        }
        //verifica se o usuario está ativo
        if (usuario.lockedDate) {
            throw new UserErrorException('Usuário está bloqueado para uso nesta plataforma. Verifique com o superior imediato.')
        }
        //verifica se o usuario não está expirado
        if (!(await this._isExpired(usuario.expiresDate))) {
            throw new UserErrorException('Seu cadastro expirou, portanto não poderá acessar esta plataforma. Verifique com o superior imediato.')
        }

        /**
         * 
         * Se o usuario for Administrador da plataforma(Classe 8 ou 9), é dispensada as verificações
         */

        const role = await roleService.findById(usuario.role_id);

        //Rotina de Verificações da Divisão correspondente
        //Configura a Divisão correspondente

        const division = await divisionService.findById(usuario.division_id);

        //Rotina de verificações da Empresa Correspondente
        //Configura a Empresa Correspondente

        const partner = await partnerService.findById(usuario.partner_id);

        //Define a variável com os dados encontrados e configura o token
        let dto = await new UserDto(usuario.toJSON())

        const token = new Token(dto.obj);

        token.obj.expiresIn = await moment().add(process.env.JWT_EXPIRES, 'minutes').toDate();

        //Retorna a informação do usuário logado
        //configurações adicionais em usuario

        /**
         * Verificações e configurações da permissão
         */

        //token.obj.role_id = role.id;
        token.obj.role_type = role.type;
        token.obj.role_class = role.class;

        /**
         * Verificações e configurações da Empresa na qual o usuário pertence
         */
        if (role.class <= 7) {

            //token.obj.partner_id = partner.id;
            token.obj.partner_name = partner.name;
            token.obj.partner_address = partner.address;
            token.obj.partner_fone = partner.phone;
            token.obj.partner_email = partner.email;
            token.obj.partner_city = partner.city;

            /**
             * Verificações e configurações da Divisão no qual o usuário pertence
             */
            //token.obj.division_id = division.id;
            token.obj.division_name = division.name
            token.obj.division_address = division.address
            token.obj.division_fone = division.phone
            token.obj.division_email = division.email
            token.obj.division_city = division.city

            /**
             * 
             * Verificações e configurações de Theme da Divisão no qual o usuário pertence
             */
            const theme = await themeService.findById(division.theme);

            token.obj.division_theme = theme.type;
        }

        /** Oculta os dados do password */
        token.obj.password = '***';

        const tk = jwt.sign(JSON.stringify(token.obj), process.env.JWT_SECRET);
        return { token: tk };
    }
    /**
     * Função para conferir se o password é válido
     * Retorna true caso o password seja compatível
     * @param {string} passwordinfo - password que se deseja conferir
     * @param {string} passwordcheck -password retornado do banco de dados para conferir com o informado.
     * @returns 
     */
    async _passworValid(passwordinfo, passwordcheck) {
        return await brcrypt.compare(passwordinfo, passwordcheck);
    }

    async _isExpired(expiresDate) {
        return await moment().isBefore(expiresDate);;
    }
    async _checkRole(role_id) {
        const role = await roleService.findOne(role_id);
        if (role)
            return role.id;
    }
}
module.exports = UserService;