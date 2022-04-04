const Service = require('../services/treatment-service');
const service = new Service();

class TreatmentController {

        async create(req, res) {
               // console.log(JSON.parse(req.body.treatment));
                //console.log(JSON.parse(req.body.treatment));
                const stored = await service.create(req)
                throw new Error('Simulação de arror');
                res.status(201).json('');
                //res.status(201).json(stored);
        };
        async findByAction(req, res){
                const stored = await service.findByAction(req);
                res.status(201).json(stored);

        }
}
module.exports = TreatmentController;