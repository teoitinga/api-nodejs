const moment = require('moment');
const brcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const MailService = require('../core/mail-service');
const mailService = new MailService();

const UserModel = require('../../models/user');
const UserDto = require('../../src/dtos/usuario-dto');

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
    UserAlreadyException
} = require('../exceptions/user-exception');

const { PartnerNotFoundException } = require('../exceptions/partner-exception');

const Token = require('../dtos/token');

require('dotenv').config();

const Cache = require('../core/cache-user');
const cache = new Cache();

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
            <p>"Atenciosamente,"</p>
            <strong>
            <p>${process.env.DESENVOLVEDOR_NAME}</p>
            <p>${process.env.DESENVOLVEDOR_COMPANY}</p>
            </strong>
            </h3>
            `
        });
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
        request.body.partner_id = credendial.partnerId;
 
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
        
        console.log('Usuário Usuario');
        
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
        const activeUser = credendial.userId;

        const user = request.body;
        user.expiresDate = moment().utc().add(1, 'months');

        user.id = uuid.v4().toUpperCase();
        //user.partner_id = request.body.partner_id;//credendial.partnerId;
        //user.division_id = request.body.division_id;//credendial.divisionId;
        user.createdby = credendial.userId;

        /**
         * Verifica se já existe este usuário nos registros
         //Exite o usuário?
         */
        const user_exists = await this.exists(user.registry);

        if (user_exists) {
            throw new UserAlreadyException(`O registro de usuário: ${user.registry} já existe no banco de dados.`)
        }
        return this.storage(user);
    }

    async findall() {

        try {

            const users = await UserModel.findAll();

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
        return await UserModel.findOne({ where: { registry } }) ? true : false;
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
        const role = await roleService.findById(usuario.role_id);


        //token.obj.role_id = role.id;
        token.obj.role_type = role.type;
        token.obj.role_class = role.class;

        /**
         * Verificações e configurações da Empresa na qual o usuário pertence
         */
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