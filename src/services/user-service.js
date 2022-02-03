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

const Token = require('../dtos/token');

class UserService {
    async create(request) {
        const user = request.body;
        
        const salt = process.env.BRCRYPT_SECRET;
        const passHashed = await brcrypt.hash(user.password, salt);

        user.id = uuid.v4().toUpperCase();
        user.expiresDate = moment().add(1, 'months');
        user.createdby = request.user.id;
        user.created = moment();
        user.password = passHashed;

        const role = await this._checkRole(user.role_id);
        user.role_id = role;

        try {
            await UserModel.create(user);
            const usuario = await UserModel.findByPk(user.id);

            let dto = await new UserDto(usuario)
            return dto.obj;

        } catch (e) {
            throw new ServerErrorException(500, e);
        }
    }
    async findall() {

        try{
    
            const users = await UserModel.findAll();

            let dto = [];
            users.map(async function(user){
                dto.push(await new UserDto(user).obj);
            });

            return dto;
    
        }catch(e){
            throw new RoleErrorException(500, 'A permissão que você informou não existe no banco de dados.');
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
            throw new UserErrorException(401, 'Usuários/Senha não existe ou está incorreto.')
        }

        if (!(await this._passworValid(password, usuario.password))) {
            throw new UserErrorException(401, 'Usuários/Senha incorreta.')
        }
        //verifica se o usuario está ativo
        if (usuario.lockedDate) {
            throw new UserErrorException(401, 'Usuário está bloqueado para uso nesta plataforma. Verifique com o superior imediato.')
        }
        //verifica se o usuario não está expirado
        if (!(await this._isExpired(usuario.expiresDate))) {
            throw new UserErrorException(401, 'Seu cadastro expirou, portanto não poderá acessar esta plataforma. Verifique com o superior imediato.')
        }
        //Rotina de Verificações da Divisão correspondente

        //Rotina de verificações da Empresa Correspondente



        //Retorna a informação do usuário logado
        let dto = await new UserDto(usuario.toJSON())

        const token = new Token(dto.obj);
        token.obj.expiresIn = await moment().add(process.env.JWT_EXPIRES, 'minutes').toDate();

        const tk = jwt.sign(JSON.stringify(token.obj), process.env.JWT_SECRET);
        return {token: tk};
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
        return role.id;
    }
}
module.exports = UserService;