const httpStatusCode = require('../exceptions/httpStatusCode');
const ApiErrors = require('./api-error');

const RoleErrorException = class RoleErrorException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super({
            name: 'Erro no informar permissão.',
            message: message,
            httpStatusCode: httpStatusCode.BAD_REQUEST,
            stack: (new Error()).stack
        }
        );
    }
}

const RoleNotFoundException = class RoleNotFoundException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
     constructor(message) {
        super({
            name: 'Permissão não reconhecida por este sistema.',
            message: message,
            httpStatusCode: httpStatusCode.NOT_FOUND,
            stack: (new Error()).stack
        }
        );
    }
}
module.exports = {
    RoleErrorException,
    RoleNotFoundException
}