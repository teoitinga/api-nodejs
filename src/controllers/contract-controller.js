const Service = require('../services/contract-service');
const service = new Service();

class ContractController {

    async create(req, res) {
        try{
            const stored = await service.create(req)
            res.status(201).json(stored);
        }catch(e){
            console.error(e);
            res.status(e.status || 500).json(e);
        }
    };
    async findall(req, res) {
        try{
            const stored = await service.findall()
            res.status(200).json(stored);
        }catch(e){
            console.error(e);
            res.status(e.status || 500).json({errors: ['Não foi possível fazer o login. Devido a um erro inesperado, tente novamente mais tarde.']});
        }
    };
}
module.exports = ContractController;