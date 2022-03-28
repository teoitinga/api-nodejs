const Service = require('../services/upload-service');
const service = new Service();

class UploadController {

        async createRater(req, res) {
                console.log(req);
                //const stored = await service.createRater(req)
                res.json({ message: "Successfully uploaded files" });
                //res.status(201).json(stored);
        };
}
module.exports = UploadController;