const httpStatusCode = require('../exceptions/httpStatusCode');
const ApiErrors = require('./api-error');

const TokenException = class TokenException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super({
            name: 'Acesso não autorizado.',
            message: message || 'Você não tem permissão para acessar esta URL.',
            httpStatusCode: httpStatusCode.UNAUTHORIZED,
            stack: (new Error()).stack
        }
        );
    }
}
const TokenHeaderException = class TokenHeaderException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super({
            name: 'Não há token válido.',
            message: message,
            httpStatusCode: httpStatusCode.UNAUTHORIZED,
            stack: (new Error()).stack
        }
        );
    }
}
const TokenIsExpired = class TokenIsExpired extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super({
            name: 'Acesso não autorizado.',
            message: message,
            httpStatusCode: httpStatusCode.UNAUTHORIZED,
            stack: (new Error()).stack
        }
        );
    }
}
const NotAuthorizedException = class NotAuthorizedException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super({
            name: 'Acesso não autorizado.',
            message: message,
            httpStatusCode: httpStatusCode.UNAUTHORIZED,
            stack: (new Error()).stack
        }
        );
    }
}

module.exports = {
    TokenException,
    NotAuthorizedException,
    TokenHeaderException,
    TokenIsExpired
}