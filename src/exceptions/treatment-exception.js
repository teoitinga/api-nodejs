const httpStatusCode = require('../exceptions/httpStatusCode');
const ApiErrors = require('./api-error');

const TreatmentException = class TreatmentException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super({
            name: 'Erro ao registrar atendimento.',
            message: message,
            httpStatusCode: httpStatusCode.BAD_REQUEST,
            stack: (new Error()).stack
        }
        );
    }


}
module.exports = {
    TreatmentException,
}