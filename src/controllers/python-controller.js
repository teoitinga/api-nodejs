const Service = require('../services/python-service');
const service = new Service();

class PythonController {

    async sendReportAter(req, res) {
        const stored = await service.sendReportAter(req);
        res.status(200).json(stored)
    };


    async generateRater(req, res) {
        const mapa = req.body['mapa'];
        const stored = await service.generateRater(mapa);
        res.status(200).json(stored)
    };

    async queryFarms(req, res) {
        const prop = req.body['prop'];
        const stored = await service.getTitulos(prop);
        res.status(200).json(stored)
    };
    async findCar(req, res) {
        const data = req.body['data'];
        const stored = await service.findCar(data);
        res.status(200).json(stored)
    };
    async simula(req, res) {
        const data = req.body;
        const stored = await service.simula(data);
        res.status(200).json(stored)
    };
    async niveis(req, res) {

        const stored = await service.niveis();
        res.status(200).json(stored)
    };
}
module.exports = PythonController;