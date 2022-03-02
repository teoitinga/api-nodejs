
require('dotenv').config();
const moment = require('moment');

const uuid = require('uuid');

const DivisionModel = require('../../models/division');
const DivisionDto = require('../../src/dtos/division-dto');

const { ServerErrorException } = require('../exceptions/server-exception');
const {
    DivisionNotFoundException,
    DivisionErrorException
} = require('../exceptions/division-exception');

const { request } = require('express');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

const ThemeService = require('./theme-service');
const themeService = new ThemeService();

class DivisionService {

    async save(request) {
        return await this._create(request);
    }

    async findall(request) {

        const credencial = await cache.getCredencial(request);

        const partner_id = credencial.partnerId;

        const divisions = await DivisionModel.findAll({
            where: {
                partner_id
            }
        });

        return divisions;
    }
    async _create(request) {

        const credendial = await cache.getCredencial(request);

        const division = request.body;

        division.id = uuid.v4().toUpperCase();

        division.partner_id = credendial.partnerId;
        division.createdby = credendial.userId;

        division.created = moment();
        division.expiresDate = moment().add(process.env.DIVISION_EXPIRES, 'month')

        return await this.storage(division);
    }
    async exists(registry) {
        return await DivisionModel.findOne({ where: { id: registry } });
    }
    async existsOnPartner(registry) {
        return await DivisionModel.findOne({ where: { id: registry } });
    }
    async findById(id) {
        return await DivisionModel.findOne({ where: { id } });
    }
    async storage(division) {

        /**
         * Verifiaca se o theme informado é válido
         */
        const theme_exists = await themeService.exists(division.theme);

        if (!theme_exists)
            throw new ServerErrorException('Tema não suportado pela plataforma.');

        await DivisionModel.create(division);

        division = await DivisionModel.findByPk(division.id);

        let dto = await new DivisionDto(division)
        return dto.obj;

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
        const division = await this.findById(id);
        if (!division) {
            throw new DivisionNotFoundException(`Divisão com ID: ${id} não reconhecido nesta plataforma.`);
        }
        /**
         * Atualiza o banco de dados, somente  expiresDate e updatedby
        */
       let expiresDate = division.expiresDate;
       
       expiresDate = moment(division.expiresDate).utc().add(process.env.DIVISION_EXPIRES_EXTEND, 'days');

       await DivisionModel.update({ expiresDate, updatedby }, { where: { id } });
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
        const division = await this.findById(id);
        
        if (!division) {
            throw new DivisionNotFoundException(`Divisão com ID: ${id} não reconhecido nesta plataforma.`);
        }

        /**
        * Atualiza o banco de dados, somente  lockedDate e updatedby
        */
        let lockedDate = division.lockedDate;

        if (!lockedDate) {
            lockedDate = moment().utc();
        } else {
            lockedDate = null;
        }
        await DivisionModel.update({ lockedDate, updatedby }, { where: { id } });
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

}
module.exports = DivisionService;