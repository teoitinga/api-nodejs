const moment = require('moment');
const uuid = require('uuid');

const RoleModel = require('../../models/role');
const RoleDto = require('../../src/dtos/usuario-dto');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

const { ServerErrorException } = require('../exceptions/server-exception');
const { RoleNotFoundException } = require('../exceptions/role-exception');

const { Op } = require("sequelize");

class RoleService {

    async create(request) {

        const credendial = await cache.getCredencial(request);

        const activeUser = credendial.userId;

        const role = request.body;

        try {

            role.id = uuid.v4().toUpperCase();
            role.createdby = activeUser;
            role.created = moment();

            await RoleModel.create(role);

            role = await RoleModel.findByPk(role.id);

            let dto = await new RoleDto(role)
            return dto.obj;
        } catch (e) {
            return new ServerErrorException(e.errors);
        }
    }

    async findOne(id) {
        const role = await RoleModel.findByPk(id);
        if(!role){
            throw new RoleNotFoundException(`Permissão com ID: ${id} não existe no banco de dados`);
        }
        return role;
    }

    async findById(id) {
        return await RoleModel.findByPk(id);

    }

    async findByClass(c) {
        const role = await RoleModel.findOne({ where: { class: c } });
        let dto = await new RoleDto(role)
        return dto.obj;
    }

    async findall(request) {
        
        const credencial = await cache.getCredencial(request);

        console.log(credencial);
        const role_class = credencial.role_class;

        const roles = await RoleModel.findAll({where:{

            class: {
                [Op.lt]:role_class
            }
        }});
        let dto = [];
        roles.map(async function (role) {
            dto.push(await new RoleDto(role).obj);
        });

        return dto;

    }
}
module.exports = RoleService;