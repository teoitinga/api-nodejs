const RoleErrorException = class RoleErrorException extends Error {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.status = 500;
        this.name = 'Erro no informar permissão.';
    }
}

const RoleNotFoundException = class RoleNotFoundException extends Error {
    /**
     * Trata Erros do Servidor
     * @param {number} status 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.status = 500;
        this.name = 'Permissão nã reconhecida por este sistema.';
    }
}
module.exports = {
    RoleErrorException,
    RoleNotFoundException
}