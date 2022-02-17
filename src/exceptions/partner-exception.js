const httpStatusCode = require('../exceptions/httpStatusCode');
const ApiErrors = require('./api-error');

const PartnerNotFoundException = class PartnerNotFoundException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super({
            name: 'Erro no informar Empresa Parceira.',
            message: message,
            httpStatusCode: httpStatusCode.NOT_FOUND,
            stack: (new Error()).stack
        }
        );
    }


}
module.exports = {
    PartnerNotFoundException
}