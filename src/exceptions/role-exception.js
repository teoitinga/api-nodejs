const RoleErrorException = class RoleErrorException extends Error {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(status, message) {
        super(message);
        this.status = status || 500;
        this.message = message || 'Erro ao registrar permissão.';
        this.name = 'Erro no informar permissão.';
        this.stack = (new Error()).stack;
    }
}
module.exports = {
    RoleErrorException
}