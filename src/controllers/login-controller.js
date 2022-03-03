const httpStatusCode = require('../exceptions/httpStatusCode');

const Service = require('../services/user-service');
const service = new Service();



class LoginController {

    async login(req, res) {
        const stored = await service.login(req.body)
        res.status(httpStatusCode.OK).json(stored);

    };

    async create(req, res) {
        const stored = await service.save(req)
        res.status(httpStatusCode.CREATED).json(stored);
    };

    async findall(req, res) {
        const stored = await service.findall(req)
        res.status(200).json(stored);
    };

    async findbyid(req, res) {
        const id = req.params['id'];
        const stored = await service.findById(id);
        res.status(200).json(stored);
    };
    async findbyname(req, res) {
        const stored = await service.findByName(req);
        res.status(200).json(stored);
    };
    async recovery(req, res) {
        const id = req.params['id'];
        const stored = await service.recovery(req, id);
        res.status(200).json(stored);
    };
    
    async update(req, res) {
        const id = req.params['id'];
        const body = req.body;
        const stored = await service.update(req, id);
        res.status(200).json(stored);
    };
    
    async toggleLock(req, res) {
        const id = req.params['id'];
        const stored = await service.toggleLock(req, id);
        res.status(200).json(stored);
    };
    async extend(req, res) {
        const id = req.params['id'];
        const stored = await service.extend(req, id);
        res.status(200).json(stored);
    };
}
module.exports = LoginController;