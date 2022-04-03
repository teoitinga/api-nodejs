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
        async actualPrices(req, res) {
                const stored = await service.actualPrices(req)
                res.status(200).json(stored);
        };
}
module.exports = IndicatorController;