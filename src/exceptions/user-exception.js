const httpStatusCode = require('../exceptions/httpStatusCode');
const ApiErrors = require('./api-error');

const UserNotFoundException = class UserNotFoundException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {string} message 
     */ 
    constructor(message) {
        super({
            name: 'Usuário não encontrado.',
            message: message,
            httpStatusCode: httpStatusCode.UNAUTHORIZED,
            stack: (new Error()).stack
        }
        );
    }
}
const UserErrorException = class UserErrorException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {string} message 
     */ 
    constructor(message) {
        super({
            name: 'Erro no registro de usuário',
            message: message,
            httpStatusCode: httpStatusCode.UNAUTHORIZED,
            stack: (new Error()).stack
        }
        );
    }
}
const UserAlreadyException = class UserAlreadyException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {string} message 
     */
    constructor(message) {
        super({
            name: 'Usuário já existe.',
            message: message,
            httpStatusCode: httpStatusCode.BAD_REQUEST,
            stack: (new Error()).stack
        }
        );
    }
}
module.exports = {
    UserAlreadyException,
    UserNotFoundException,
    UserErrorException
}