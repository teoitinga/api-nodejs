const Service = require('../services/role-service');
const service = new Service();

class RoleController {

    async create(req, res) {
            const stored = await service.create(req)
            res.status(201).json(stored);
    };
    async findall(req, res) {
            getCredencial(req);
            const stored = await service.findall();
            res.status(200).json(stored)
    };
}
module.exports = RoleController;