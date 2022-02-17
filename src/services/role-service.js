const uuid = require('uuid');
const RoleModel = require('../../models/role');
const RoleDto = require('../../src/dtos/usuario-dto');
const moment = require('moment');

const { ServerErrorException } = require('../exceptions/server-exception');
const { RoleErrorException } = require('../exceptions/role-exception');

class RoleService {

    async create(role) {
        try {

            role.id = uuid.v4().toUpperCase();
            role.createdby = 'sldakshdkajsd'
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
        let dto = await new RoleDto(role)
        return dto.obj;
    }

    async findById(id){
        return await RoleModel.findByPk(id);
        
    }

    async findByClass(c) {
            const role = await RoleModel.findOne({ where: { class: c } });
            let dto = await new RoleDto(role)
            return dto.obj;
    }
    async findall() {
        try {

            const roles = await RoleModel.findAll();

            let dto = [];
            roles.map(async function (role) {
                dto.push(await new RoleDto(role).obj);
            });

            return dto;

        } catch (e) {
            console.log(e)
            return new RoleErrorException('A permissão que você informou não existe no banco de dados.');
        }
    }
}
module.exports = RoleService;