const httpStatusCode = require('./httpStatusCode');
const ApiErrors = require('./api-error');

const DivisionErrorException = class DivisionErrorException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super({
            name: 'Erro no informar Divisão de setor.',
            message: message,
            httpStatusCode: httpStatusCode.BAD_REQUEST,
            stack: (new Error()).stack
        }
        );
    }
}

const DivisionNotFoundException = class RDivisionNotFoundException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
     constructor(message) {
        super({
            name: 'Divisão/Setor não reconhecido por esta plataforma.',
            message: message,
            httpStatusCode: httpStatusCode.NOT_FOUND,
            stack: (new Error()).stack
        }
        );
    }
}
module.exports = {
    DivisionErrorException,
    DivisionNotFoundException
}