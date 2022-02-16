const Service = require('../services/contract-service');
const service = new Service();

class ContractController {

    async create(req, res) {
        const stored = await service.create(req)
        res.status(201).json(stored);

    };
    async findall(req, res) {
        const stored = await service.findall()
        res.status(200).json(stored);
    };

    async tender(req, res) {
        const stored = await service.tender(req);
        res.status(200).json(stored);
    }
}
module.exports = ContractController;