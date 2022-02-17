const httpStatusCode = require('../exceptions/httpStatusCode');

const Service = require('../services/user-service');
const service = new Service();



class LoginController {

    async login(req, res) {
        const stored = await service.login(req.body)
        res.status(httpStatusCode.OK).json(stored);

    };

    async create(req, res) {
        const stored = await service.create(req)
        res.status(httpStatusCode.CREATED).json(stored);
    };

    async findall(req, res) {
        const stored = await service.findall()
        res.status(200).json(stored);
    };
}
module.exports = LoginController;