const moment = require('moment');
const brcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const UserModel = require('../../models/user');
const UserDto = require('../../src/dtos/usuario-dto');

const RoleService = require('../services/role-service');
const roleService = new RoleService();

const { ServerErrorException } = require('../exceptions/server-exception');
const { UserErrorException } = require('../exceptions/user-exception');
const { RoleErrorException } = require('../exceptions/role-exception');

const Token = require('../dtos/token');

require('dotenv').config();
const Cache = new require('../core/cache-user');
const cache = new Cache();

class UserService {
    constructor(){}
    async create(request) {
        const user = request.body;

        const salt = process.env.BRCRYPT_SECRET;

        console.log(user.password)
        console.log(salt)

        const passHashed = await brcrypt.hash(user.password, 10);

        user.id = uuid.v4().toUpperCase();
        user.expiresDate = moment().utc().add(1, 'months');

        const token = await request.headers.authorization.split(' ')[1];
        const userActive = await cache.userLogged(token);

        user.partner_id = userActive.partner_id;
        user.division_id = userActive.division_id;

        user.createdby = userActive.id;
        user.created = moment().utc();
        user.password = passHashed;

        /**
         * Confere se existe o ID da permissão no banco de dados e configura caso exista.
         */
        const role = await this._checkRole(user.role_id);

        user.role_id = role;

        try {
            await UserModel.create(user);
            const usuario = await UserModel.findByPk(user.id);

            let dto = await new UserDto(usuario)
            return dto.obj;

        } catch (e) {
            throw new ServerErrorException(e);
        }
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

        const division = '';

        //Rotina de verificações da Empresa Correspondente
        //Configura a Empresa Correspondente

        const partner = '';

        //Define a variável com os dados encontrados e configura o token
        let dto = await new UserDto(usuario.toJSON())
        
        const token = new Token(dto.obj);

        token.obj.expiresIn = await moment().add(process.env.JWT_EXPIRES, 'minutes').toDate();
        
        //Retorna a informação do usuário logado
        //configurações adicionais em usuario
        
        /**
         * Verificações e configurações da permissão
         */
        const role = '';
        
        //token.obj.role_id = 'obj.role_id';
        token.obj.role_type = 'obj.role_id';
        token.obj.role_class = 'obj.role_id';
        
        /**
         * Verificações e configurações da Empresa na qual o usuário pertence
         */
        //token.obj.partner_id = 'obj.partner_id';
        token.obj.partner_name = 'obj.partner_name';
        token.obj.partner_address = 'obj.partner_address';
        token.obj.partner_fone = 'obj.partner_fone';
        token.obj.partner_email = 'obj.partner_email';
        token.obj.partner_city = 'obj.partner_city';
        
        /**
         * Verificações e configurações da Divisão no qual o usuário pertence
         */
        //token.obj.division_id = 'obj.division_id';
        token.obj.division_name = 'obj.division_name';
        token.obj.division_address = 'obj.division_address';
        token.obj.division_fone = 'obj.division_fone';
        token.obj.division_email = 'obj.division_email';
        token.obj.division_city = 'obj.division_city';
        token.obj.division_theme = 'obj.division_them';

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

        throw new RoleErrorException('Permissão de usuário não reconhecida.')
    }
}
module.exports = UserService;