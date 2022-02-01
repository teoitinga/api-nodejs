const UserErrorException = class UserErrorException extends Error {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(status, message) {
        super(message);
        this.status = status || 403;
        this.message = message || 'Erro ao tentar logar no sistema.';
        this.name = 'Erro no logar no sistema.';
        this.stack = (new Error()).stack;
    }
}
module.exports = {
    UserErrorException
}