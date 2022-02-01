const moment = require('moment');
const brcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const ContractModel = require('../../models/contract');
const ContractDto = require('../dtos/contract-dto');

const { ServerErrorException } = require('../exceptions/server-exception');
const { NotAuthorizedException } = require('../exceptions/token-exceptions');

class ContractService {
    async create(request) {
        console.log(`Inserindo registro de contrato`);
        const contract = await request.body;


        contract.id = await uuid.v4().toUpperCase();
        try {
            contract.createdby = await request.user.id || '***';

        } catch (e) {
            throw new NotAuthorizedException(null, 'Não foi possível verificar o usuário através do token de acesso.');
        }
        contract.created = await moment();


        await ContractModel.create(contract);
        const c = await ContractModel.findByPk(contract.id);

        console.log(`Inserindo registro de contrato: ${JSON.stringify(c)}`);
        let dto = await new ContractDto(c)
        return dto.obj;

    }
    async findall() {

        try {

            const users = await ContractModel.findAll();

            let dto = [];
            users.map(async function (user) {
                dto.push(await new ContractDto(user).obj);
            });

            return dto;

        } catch (e) {
            console.error(e);
        }
    }

}
module.exports = ContractService;