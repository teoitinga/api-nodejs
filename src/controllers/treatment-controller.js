const Service = require('../services/treatment-service');
const service = new Service();

class TreatmentController {

        async create(req, res) {
                const stored = await service.create(req)
                res.status(201).json(stored);
        };
        async findByAction(req, res){
                const stored = await service.findByAction(req);
                res.status(201).json(stored);

        }
}
module.exports = TreatmentController;