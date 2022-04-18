const httpStatusCode = require('./httpStatusCode');
const ApiErrors = require('./api-error');

const DapNotFoundException = class DapNotFoundException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {string} message 
     */ 
    constructor(message) {
        super({
            name: 'Dap não encontrada.',
            message: message,
            httpStatusCode: httpStatusCode.NOT_FOUND,
            stack: (new Error()).stack
        }
        );
    }
}
const ApiDapException = class ApiDapException extends ApiErrors {
    /**
     * Trata Erros do Servidor
     * @param {string} message 
     */ 
    constructor(message) {
        super({
            name: `Erro no servidor do sistema de DAP's`,
            message: message,
            httpStatusCode: httpStatusCode.INTERNAL_SERVER,
            stack: (new Error()).stack
        }
        );
    }
}

module.exports = {
    ApiDapException,
    DapNotFoundException
}