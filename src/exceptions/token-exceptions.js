const TokenException = class TokenException {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(status, message) {
        this.status = status || 401;
        this.message = message || 'Acesso não autorizado.';
        this.name = 'Você não tem permissão para acessar esta URL.';
        this.stack = (new Error()).stack;
    }
}
const TokenIsExpired = class TokenIsExpired {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(status, message) {
        this.status = status || 401;
        this.message = message || 'Acesso não autorizado.';
        this.name = 'Você não tem permissão para acessar esta URL.';
        this.stack = (new Error()).stack;
    }
}
const NotAuthorizedException = class NotAuthorizedException {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(status, message) {
        this.status = status || 401;
        this.message = message || 'Acesso não autorizado.';
        this.name = 'Você não tem permissão para acessar esta URL.';
        this.stack = (new Error()).stack;
    }
}

module.exports = {
    TokenException,
    NotAuthorizedException,
    TokenIsExpired
}