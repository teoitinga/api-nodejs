const TokenException = class TokenException extends Error{
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.status = 401;
        this.name = 'Acesso não autorizado.';
        this.message = message || 'Você não tem permissão para acessar esta URL.';
    }
}
const TokenHeaderException = class TokenHeaderException extends Error{
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super(message);
        this.status = 401;
        this.name = 'Não há token válido.';
    }
}
const TokenIsExpired = class TokenIsExpired  extends Error{
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super(message);
        this.status = 401;
        this.name = 'Acesso não autorizado.';
    }
}
const NotAuthorizedException = class NotAuthorizedException extends Error {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super(message);
        this.status = 401;
        this.name = 'Acesso não autorizado.';
    }
}

module.exports = {
    TokenException,
    NotAuthorizedException,
    TokenHeaderException,
    TokenIsExpired
}