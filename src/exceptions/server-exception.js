const httpStatusCode = require('../exceptions/httpStatusCode');
const ApiErrors = require('./api-error');
const ServerErrorException = class ServerErrorException extends ApiErrors{
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super({
            name: 'Ocorreu um erro no servidor da api.',
            message: message,
            httpStatusCode: httpStatusCode.INTERNAL_SERVER,
            stack: (new Error()).stack
        });
    }
}
module.exports = {
    ServerErrorException
}