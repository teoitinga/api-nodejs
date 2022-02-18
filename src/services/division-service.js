
require('dotenv').config();
const moment = require('moment');

const uuid = require('uuid');

const DivisionModel = require('../../models/division');
const DivisionDto = require('../../src/dtos/division-dto');

const { ServerErrorException } = require('../exceptions/server-exception');
const { request } = require('express');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

const ThemeService = require('./theme-service');
const themeService = new ThemeService();

class DivisionService {

    async save(request){
        return await this._create(request);
    }
      
    async _create(request){

        const credendial = await cache.getCredencial(request);

        const division = request.body;
        
        division.id = uuid.v4().toUpperCase();

        division.partner_id = credendial.partnerId;
        division.createdby = credendial.userId;

        division.created = moment();
        division.expiresDate = moment().add(process.env.DIVISION_EXPIRES, 'month')

        return await this.storage(division);
    }
    async exists(registry){
        return await DivisionModel.findOne({where:{registry}});
    }
    async existsOnPartner(registry){
        return await DivisionModel.findOne({where:{registry}});
    }
    async findById(id){
        return await DivisionModel.findByPk(id);
        
    }
    async storage(division){

        /**
         * Verifiaca se o theme informado é válido
         */
        const theme_exists = await themeService.exists(division.theme);

        if(!theme_exists)
            throw new ServerErrorException('Tema não suportado pela plataforma.');

            await DivisionModel.create(division);
    
            division = await DivisionModel.findByPk(division.id);
    
            let dto = await new DivisionDto(division)
            return dto.obj;

    }


}
module.exports = DivisionService;