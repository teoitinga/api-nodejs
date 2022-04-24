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
        async findAll(req, res) {
                const stored = await service.findAll(req);
                res.status(200).json(stored);
        }
        async findById(req, res) {
                const stored = await service.findById(req);
                res.status(200).json(stored);
        }
        async findAllActions(req, res) {
                const stored = await service.findAllActions(req);
                res.status(200).json(stored);
        }
        async findbyschooling(req, res) {
                const stored = await service.findbySchooling(req);
                res.status(200).json(stored);
        }
}
module.exports = ProjectController;