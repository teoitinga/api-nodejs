const jwt = require('jsonwebtoken');
const moment = require('moment');

const RoleService = require('../services/role-service');
const roleService = new RoleService();

const {
    TokenException,
    NotAuthorizedException,
    TokenIsExpired,
    TokenHeaderException
} = require('../exceptions/token-exceptions')

let user = undefined;

async function _decodetoken(req) {
    const authorization = req.headers.authorization;

    let usertoken = undefined;

    if (!authorization) {
        return undefined;
    }

    const token = authorization.split(' ')[1];

    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (!err) {
            usertoken = user;
        }
        else {
            return false;
        }
    })
    return usertoken;
}

async function class_10(req, res, next) {
    _class_level_access(req, res, next, 8);
}
async function class_0(req, res, next) {
    next();
}
async function _class_level_access(req, res, next, level = 1) {

    nivel_minimo = level;

    const user = await _decodetoken(req)

    //verifica o token

    if (!user) {
        res.status(401).json(new TokenHeaderException(401));
    }

    const expired = moment().isBefore(user.expiresIn);

    if (!expired) {
        return res.status(401).json(new TokenIsExpired(401, 'Sua credendial expirou.'));
    }

    //confere a classe da permissão do usuario
    const role = await roleService.findOne(user.role_id);
    const classe = role.class;

    //Verifica se a permissão e comativel - classe de permissão menor ou igual
    if (classe < nivel_minimo) {
        return res.status(403).json(new NotAuthorizedException(403, 'Você não tem autorização para acessar esta URL.'));
    }
    req.user = user;
    console.log('Usuário logado');
    console.log(req.user);
    next();
}

module.exports = {
    class_10,
    class_0
};