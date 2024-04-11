const Service = require('../services/customer-service');
const service = new Service();

class CustomerController {

        async findByCpf(req, res) {
                const stored = await service.findCustomer(req);
                res.status(200).json(stored[0]);
        };

        async findByLike(req, res){

                const stored = await service.findByLike(req);

                res.status(200).json(stored);                
        }

        async findActions(req, res){

                const stored = await service.findActions(req);

                console.log(stored);
                res.status(200).json(stored);                
        }
}
module.exports = CustomerController;