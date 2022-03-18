const Service = require('../services/dap-service');
const service = new Service();

class DapController {

    async findByCpf(req, res) {
        const cpf = req.params['cpf'];
        const stored = await service.findByCpf(cpf);
        res.status(200).json(stored)
};
}
module.exports = DapController;