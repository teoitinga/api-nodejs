const uuid = require('uuid');
const PartnerModel = require('../../models/partner');
const PartnerDto = require('../../src/dtos/partner-dto');

const moment = require('moment');

const { ServerErrorException } = require('../exceptions/server-exception');

class PartnerService {

    async create(partner) {
        partner.id = uuid.v4().toUpperCase();
        partner.createdby = 'sldakshdkajsd'
        partner.created = moment();

        return await this.storage(partner);
    }

    async exists(registry){
        return await PartnerModel.findOne({where:{registry}})?true:false;
    }

    async storage(partner) {

        try {
    
            await PartnerModel.create(partner);
    
            partner = await PartnerModel.findByPk(partner.id);
    
            let dto = await new PartnerDto(partner)
            return dto.obj;
        } catch (e) {
            return new ServerErrorException(e.errors);
        }

    }


}
module.exports = PartnerService;