const uuid = require('uuid');
const ThemeModel = require('../../models/theme');
const moment = require('moment');
const { ServerErrorException } = require('../exceptions/server-exception');

class ThemeService {

    async create(theme) {
        try {

            theme.id = uuid.v4().toUpperCase();
            theme.createdby = 'sldakshdkajsd'
            theme.created = moment();

            await ThemeModel.create(theme);

            theme = await ThemeModel.findByPk(theme.id);

            return theme;

        } catch (e) {
            return new ServerErrorException(e.errors);
        }
    }

    async findById(id){
        return await ThemeModel.findByPk(id);
    }

    async findByType(type) {
            const theme = await ThemeModel.findOne({ where: { type } });
            return theme;
    }

}
module.exports = ThemeService;