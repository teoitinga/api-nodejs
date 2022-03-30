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

const UserModel = require('../../models/user');
const UserDto = require('../../src/dtos/usuario-dto');

const RoleModel = require('../../models/role');

const RoleService = require('../services/role-service');
const roleService = new RoleService();

const PartnerService = require('../services/partner-service');
const partnerService = new PartnerService();

const DivisionService = require('../services/division-service');
const divisionService = new DivisionService();

const ThemeService = require('../services/theme-service');
const themeService = new ThemeService();

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

    async sendMail(obj) {
        await mailService.send({
            to: obj.email,
            subject: `Cadastro de usuário na plataforma JP-Ares`,
            text: `Você acaba de ser registrado na plataforma JP-AREs, nosso portal de gestão e acompanhamento de projetos. Segue abaixo os dados para acesso`,
            html: `
            <h1>Olá <strong>${obj.name},</strong></h1>
            <h3 style="color: black">
            <p>Você acaba de ser registrado na plataforma JP-AREs, nosso portal de gestão e acompanhamento de projetos. Segue abaixo os dados para acesso:</p>
            <p><strong>Seu login:</strong> ${obj.registry}</p>
            <p><strong>Sua senha provisória:</strong> ${obj.password}</p>
            <br>
            <p>clique neste link para acessar o portal: <a href="${process.env.APP_LINK_API}">JP-ARES</a></p>
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
        console.log('Usuário Admin');

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

        console.log('Usuário Gestor');

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

        expiresDate = moment(user.expiresDate).utc().add(process.env.USER_EXPIRES_EXTEND, 'days');
        /*
        if (!expiresDate) {
            expiresDate = moment(user.expiresDate).utc().add(process.env.USER_EXPIRES_EXTEND, 'days');
        } else {
            expiresDate = null;
        }*/
        await UserModel.update({ expiresDate, updatedby }, { where: { id } });
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

        return users[0];
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
        users.name as username,
        users.id as userid,
        users.division_id as division,
        users.partner_id as partner,
        tasks.id, tasks.status, tasks.created, treatments.data, tasks.description, tasks.qtd, treatments.pathFileName,
        tasks.userDesigned_id
            FROM tasks
            left join treatments on treatments.id= tasks.treatment_id
            left join treatment_customers on treatment_customers.treatment_id = treatments.id
            left join customers on customers.id = treatment_customers.customer_id
            left join users on users.id = tasks.userDesigned_id
            where tasks.userDesigned_id=  '${userId}'
            and tasks.status = 'INICIADA'
            group by tasks.treatment_id
            order by treatments.data desc
        ;
        `;
        const tasks = await UserModel.sequelize.query(query, { type: UserModel.sequelize.QueryTypes.SELECT });

        return tasks;
    }

    /**
SELECT 
customers.name as customername,
users.name as username,
users.id as userid,
users.division_id as division,
users.partner_id as partner,
tasks.id, tasks.status, tasks.created, treatments.data, tasks.description, tasks.qtd, treatments.pathFileName,
tasks.userDesigned_id
FROM smart_dev.tasks
left join treatments on treatments.id = tasks.treatment_id
left join treatment_customers on treatment_customers.treatment_id = treatments.id
left join customers on customers.id = treatment_customers.customer_id
left join users on users.id = tasks.userDesigned_id
;
     */

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
        const credencial = await cache.getCredencial(request);

        const partner_id = credencial.partnerId;
        const division_id = credencial.divisionId;
        const role_class = credencial.role_class;
        const id = credencial.userId;

        //Se classe >8, retorna todos
        if (role_class > 8) {
            const query = `
            SELECT * FROM users 
                left join roles 
            `;
            const users = await UserModel.sequelize.query(query);
            return users[0];
        }
        //Se classe >5 e <8 retorn os usuarios da empresa
        if ((role_class >= 5) && (role_class <= 8)) {
            const query = `
            SELECT * FROM users 
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
            users.id, users.name, users.registry, users.email, users.role_id, users.partner_id, users.division_id, users.password, users.address, users.num, users.district, users.complement, users.cep, users.phone, users.city, users.uf, users.expiresDate, users.lockedDate, users.createdby, users.updatedby, users.created, users.updated
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