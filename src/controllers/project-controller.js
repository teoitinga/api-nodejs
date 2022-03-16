const Service = require('../services/project-service');
const service = new Service();

class ProjectController {

        async create(req, res) {
                const stored = await service.create(req)
                res.status(201).json(stored);
        };
        async findbyname(req, res) {
                const stored = await service.findByName(req);
                res.status(200).json(stored);
        }
        async findbyschooling(req, res) {
                const stored = await service.findbySchooling(req);
                res.status(200).json(stored);
        }
}
module.exports = ProjectController;