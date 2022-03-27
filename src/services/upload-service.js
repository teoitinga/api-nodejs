const moment = require('moment');
const uuid = require('uuid');

const UserCache = require('../core/cache-user');
const cache = new UserCache();

const { ServerErrorException } = require('../exceptions/server-exception');

const { Op } = require("sequelize");

class UploadService {

    async createRater(request) {
        return '';
    }


}
module.exports = UploadService;