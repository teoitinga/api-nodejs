const httpStatusCode = require('../exceptions/httpStatusCode');
const ApiErrors = require('./api-error');

const UserErrorException = class UserErrorException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {string} message 
     */
    constructor(message) {
        super({
            name: 'Erro no logar no sistema.',
            message: message,
            httpStatusCode: httpStatusCode.UNAUTHORIZED,
            stack: (new Error()).stack
        }
        );
    }
}
module.exports = {
    UserErrorException
}