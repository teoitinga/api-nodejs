const ModeModel = require('../../models/mode');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

class ModeService {

    async findOne(id) {
        const mode = await ModeModel.findByPk(id);
        return mode;
    }

}
module.exports = ModeService;