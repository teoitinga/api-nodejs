const Service = require('../services/theme-service');
const service = new Service();

class ThemeController {

    async create(req, res) {
            const stored = await service.create(req)
            res.status(201).json(stored);
    };
    async findall(req, res) {
            const stored = await service.findAll();
            res.status(200).json(stored)
    };
    async findById(req, res) {
        const id = req.params['id'];
        console.log(id);
        const stored = await service.findById(id);
        res.status(200).json(stored)
};
}
module.exports = ThemeController;