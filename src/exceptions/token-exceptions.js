const TokenException = class TokenException {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(status, message) {
        
        this.status = status || 401;
        this.name = 'Acesso não autorizado.';
        this.message = message || 'Você não tem permissão para acessar esta URL.';
        this.stack = (new Error()).stack;
    }
}
const TokenHeaderException = class TokenHeaderException{
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(status, message) {
        this.status = status || 401;
        this.name = 'Não há token válido.';
        this.message = message || 'Não existe token do usuário registrado, portanto não é possível acessar esta url.';
        this.stack = super.stack;
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
        this.name = 'Acesso não autorizado.';
        this.message = message || 'Você não tem permissão para acessar esta URL.';
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
        this.name = 'Acesso não autorizado.';
        this.message =  message || 'Você não tem permissão para acessar esta URL.';
        this.stack = (new Error()).stack;
    }
}

module.exports = {
    TokenException,
    NotAuthorizedException,
    TokenHeaderException,
    TokenIsExpired
}