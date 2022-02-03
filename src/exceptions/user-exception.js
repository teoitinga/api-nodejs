const UserErrorException = class UserErrorException extends Error{
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super(message);
        this.status = 403;
        this.name = 'Erro no logar no sistema.';
    }
}
module.exports = {
    UserErrorException
}