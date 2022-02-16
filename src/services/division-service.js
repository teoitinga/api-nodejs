const uuid = require('uuid');
const DivisionModel = require('../../models/division');
const DivisionDto = require('../../src/dtos/division-dto');

const moment = require('moment');

const { ServerErrorException } = require('../exceptions/server-exception');

class DivisionService {

    async create(division){
        division.id = uuid.v4().toUpperCase();
        division.createdby = 'sldakshdkajsd'
        division.created = moment();

        return await this.storage(division);
    }
    async exists(registry){
        return await DivisionModel.findOne({where:{registry}});
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