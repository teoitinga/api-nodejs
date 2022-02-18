const uuid = require('uuid');
const PartnerModel = require('../../models/partner');
const PartnerDto = require('../../src/dtos/partner-dto');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

const moment = require('moment');

const { ServerErrorException } = require('../exceptions/server-exception');
const { request } = require('express');

class PartnerService {

    async create(request) {

        const credendial = await cache.getCredencial(request);
        const activeUser = credendial.userId;

        const partner = request.body;

        partner.id = uuid.v4().toUpperCase();
        partner.createdby = activeUser
        partner.created = moment();

        return await this.storage(partner);
    }
    async findById(id){
        return await PartnerModel.findByPk(id);
        
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