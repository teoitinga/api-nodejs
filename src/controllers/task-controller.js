const Service = require('../services/task-service');
const service = new Service();

class TaskController {

        async addComment(req, res) {
                const stored = await service.addComment(req);
                res.status(200).json(stored)
        };
}
module.exports = TaskController;