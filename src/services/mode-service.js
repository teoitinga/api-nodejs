const ModeModel = require('../../models/mode');
const { getCredencial } = require('../services/token-service');

class ModeService {

    async findOne(id) {
        const mode = await ModeModel.findByPk(id);
        return mode;
    }

}
module.exports = ModeService;