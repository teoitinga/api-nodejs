const Service = require('../services/upload-service');
const service = new Service();

class UploadController {

        async createRater(req, res) {
                const stored = await service.createRater(req)
                res.status(201).json(stored);
        };
}
module.exports = UploadController;