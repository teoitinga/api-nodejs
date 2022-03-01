const Service = require('../services/division-service');
const service = new Service();

class DivisionController {

        async create(req, res) {
                const stored = await service.save(req)
                res.status(201).json(stored);
        };
        async findall(req, res) {
                const stored = await service.findall(req);
                res.status(200).json(stored)
        };
        async findById(req, res) {
                const id = req.params['id'];
                const stored = await service.findById(id);
                res.status(200).json(stored)
        };
}
module.exports = DivisionController;