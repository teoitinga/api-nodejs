const { decode } = require('../services/token-service');

class cache {

    users = [];

    constructor() {
    }

    async userLogged(token) {
        const user = await decode(token);
        return user;
    }
    async addUser(user){
        this.users.pop(user);
    }

}
module.exports = cache;