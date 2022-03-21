const Service = require('../services/customer-service');
const service = new Service();

class CustomerController {

        async findByCpf(req, res) {
                const stored = await service.findCustomer(req);
                res.status(200).json(stored[0]);
        };
}
module.exports = CustomerController;