const Service = require('../services/indicator-service');
const service = new Service();



class IndicatorController {

        async cepceaLeiteMG(req, res) {
                const stored = await service.cepeaLeiteMg(req)
                res.status(200).json(stored);
        };
        async cepeaBoi(req, res) {
                const stored = await service.cepeaBoi(req)
                res.status(200).json(stored);
        };
        async cepeaBezerro(req, res) {
                const stored = await service.cepeaBezerro(req)
                res.status(200).json(stored);
        };
        async cepeaMilho(req, res) {
                const stored = await service.cepeaMilho(req)
                res.status(200).json(stored);
        };
        async cepeaCafeArabica(req, res) {
                const stored = await service.cepeaCafeArabica(req)
                res.status(200).json(stored);
        };

        async cepeaCafeRobusta(req, res) {
                const stored = await service.cepeaCafeRobusta(req)
                res.status(200).json(stored);
        };
        async actualPrices(req, res) {
                const stored = await service.actualPrices(req)
                res.status(200).json(stored);
        };
        async reloadCepea(req, res) {
                const stored = await service.reloadCepea(req)
                console.log(stored.data);
                res.status(200).send(stored.data);
        };
        async updateCepea(req, res) {
                const stored = await service.updateCepea(req)
                res.status(200).send(stored.data);
        };
}
module.exports = IndicatorController;