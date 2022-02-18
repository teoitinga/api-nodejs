const uuid = require('uuid');
const DivisionModel = require('../../models/division');
const DivisionDto = require('../../src/dtos/division-dto');

const moment = require('moment');

const { ServerErrorException } = require('../exceptions/server-exception');
const { request } = require('express');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

class DivisionService {

    async create(request){

        const credendial = await cache.getCredencial(request);
        const activeUser = credendial.userId;

        const division = request.body;
        
        division.id = uuid.v4().toUpperCase();
        division.createdby = activeUser;
        division.created = moment();

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

        try{
    
            await DivisionModel.create(division);
    
            division = await DivisionModel.findByPk(division.id);
    
            let dto = await new DivisionDto(division)
            return dto.obj;
        }catch(e){
            throw new ServerErrorException(e);
        }

    }


}
module.exports = DivisionService;