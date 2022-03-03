const Service = require('../services/project-service');
const service = new Service();

class ProjectController {

        async create(req, res) {
                const stored = await service.create(req)
                res.status(201).json(stored);
        };
}
module.exports = ProjectController;