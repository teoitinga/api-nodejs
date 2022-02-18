const httpStatusCode = require('../exceptions/httpStatusCode');
const ApiErrors = require('./api-error');
const ServerErrorException = class ServerErrorException extends ApiErrors{
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(error) {
        console.log(error);
        super({
            name: 'Ocorreu um erro no servidor da api.',
            message: error,
            httpStatusCode: httpStatusCode.INTERNAL_SERVER,
            stack: (new Error()).stack
        });
    }
}
const NotFoundErrorException = class NotFoundErrorException extends ApiErrors{
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(error) {
        super({
            name: 'Ocorreu um erro.',
            message: error,
            httpStatusCode: httpStatusCode.NOT_FOUND,
            stack: (new Error()).stack
        });
    }
}
module.exports = {
    NotFoundErrorException,
    ServerErrorException
}