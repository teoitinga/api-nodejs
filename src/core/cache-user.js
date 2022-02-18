const jwt = require('jsonwebtoken');
const { TokenException } = require('../exceptions/token-exceptions');

class UserCache {

    users = [];

    async getCredencial(token) {

        let user = {};

        const authorization = token.headers.authorization;

        const tk = authorization.split(' ')[1];

        await jwt.verify(tk, process.env.JWT_SECRET, (err, usr) => {
            user = usr;
        })

        if(!user){
            throw new TokenException('Usuário não identificado!');
        }
        const obj = {
            username: user.name,
            userId: user.id,
            partnername: user.partner_name,
            partnerId: user.partner_id,
            divisionname: user.division_name,
            divisionId: user.division_id,
            role_name: user.role_type,
            role_class: user.role_class
        };

        return obj;
    }
    async addUser(user) {
        this.users.pop(user);
    }

}
module.exports = UserCache;