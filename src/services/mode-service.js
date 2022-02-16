const ModeModel = require('../../models/mode');

class ModeService {

    async findOne(id) {
        const mode = await ModeModel.findByPk(id);
        return mode;
    }

}
module.exports = ModeService;