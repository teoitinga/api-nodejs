const httpStatusCode = require('../exceptions/httpStatusCode');
const ApiErrors = require('./api-error');

const RoleErrorException = class RoleErrorException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super(
            'Erro no informar permissão.',
            message,
            httpStatusCode.UNAUTHORIZED,
            (new Error()).stack
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
        super(
            'Permissão nã reconhecida por este sistema.',
            message,
            httpStatusCode.UNAUTHORIZED,
            (new Error()).stack
        );
    }
}
module.exports = {
    RoleErrorException,
    RoleNotFoundException
}