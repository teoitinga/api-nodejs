const { ServerErrorException } = require('../exceptions/server-exception');
const uuid = require('uuid');

const agroindustriaModel = require('../../models/agroindustria');


class AgroindustriaRegister {

    async register(register) {

        try {
            const agro = await agroindustriaModel.create(register);
            return agro;
        } catch (e) {
            throw new ServerErrorException(e);
        }
    }
}

module.exports = AgroindustriaRegister;